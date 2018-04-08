import * as express from "express";
import {
    CommonHelper,
    ConnectionFactory,
    DynamicQuery,
    IConnection,
    MappingProvider,
    Page,
    PageRowBounds,
    SortDescriptor,
    SortDirection,
} from "tsbatis";
import { myContainer } from "../ioc/inversify.config";
import { UserFriendCategoryMapper } from "../mappers/userFriendCategoryMapper";
import { AddUserFriendCategoryDto } from "../models/dto/addUserFriendCategoryDto";
import { UpdateUserFriendCategoryDto } from "../models/dto/updateUserFriendCategoryDto";
import { UserFriendCategory } from "../models/entities/tables/userFriendCategory";

export class UserFriendCategoryApi {
    private readonly connectionFactory: ConnectionFactory;
    constructor() {
        this.connectionFactory = myContainer.get<ConnectionFactory>(ConnectionFactory);
    }

    public getRoute(): express.Router {
        const routerApi = express.Router();

        /**
         * @swagger
         * definitions:
         *  AddUserFriendCategoryDto:
         *     type: object
         *     required:
         *       - userId
         *       - categoryName
         *     properties:
         *       userId:
         *         type: integer
         *       categoryName:
         *         type: string
         *  UpdateUserFriendCategoryDto:
         *     type: object
         *     required:
         *       - categoryName
         *     properties:
         *       categoryName:
         *         type: string
         *  UserFriendCategory:
         *     type: object
         *     properties:
         *      id:
         *          type: integer
         *      userId:
         *          type: integer
         *      categoryName:
         *          type: string
         *      categoryIndex:
         *          type: integer
         *      createTime:
         *          type: Date
         *      updateTime:
         *          type: Date
         */

        /**
         * @swagger
         * /ts_im_apis/userFriendCategory:
         *    post:
         *      tags:
         *      - userFriendCategory
         *      summary: "添加用户分类"
         *      description: ""
         *      consumes:
         *      - "application/json"
         *      produces:
         *      - "application/json"
         *      parameters:
         *      - in: "body"
         *        name: "body"
         *        required: true
         *        schema:
         *          $ref: '#/definitions/AddUserFriendCategoryDto'
         *      responses:
         *        200:
         *          description: Success add userFriendCategory
         */
        routerApi.post("/", (req, res, next) => {
            console.log("body", JSON.stringify(req.body));
            const input = MappingProvider.toDtoObject<AddUserFriendCategoryDto>(AddUserFriendCategoryDto, req.body);
            console.log("result", JSON.stringify(input));
            this.addUserFriendCategory(input)
                .then((data) => {
                    res.json(data);
                })
                .catch((err) => {
                    res.status(500).send(err.message);
                });
        });

        /**
         * @swagger
         * /ts_im_apis/userFriendCategory/{categoryId}:
         *    delete:
         *      tags:
         *      - userFriendCategory
         *      summary: "删除用户分类"
         *      description: ""
         *      consumes:
         *      - "application/json"
         *      produces:
         *      - "application/json"
         *      parameters:
         *       - name: categoryId
         *         description: 分类ID
         *         in: path
         *         required: true
         *         type: integer
         *      responses:
         *        200:
         *          description: OK
         */
        routerApi.delete("/:categoryId", (req, res, next) => {
            const categoryId = req.params.categoryId;
            console.log("categoryId", categoryId);
            this.deleteUserFriendCategory(categoryId)
                .then((data) => {
                    res.json(data);
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        });

        /**
         * @swagger
         * /ts_im_apis/userFriendCategory/{categoryId}:
         *    put:
         *      tags:
         *      - userFriendCategory
         *      summary: "修改用户分类"
         *      description: ""
         *      consumes:
         *      - "application/json"
         *      produces:
         *      - "application/json"
         *      parameters:
         *       - name: categoryId
         *         description: 分类ID
         *         in: path
         *         required: true
         *         type: integer
         *       - name: category
         *         description: 修改分类
         *         in: body
         *         required: true
         *         schema:
         *           $ref: '#/definitions/UpdateUserFriendCategoryDto'
         *      responses:
         *        200:
         *          description: OK
         */
        routerApi.put("/:categoryId", (req, res, next) => {
            const categoryId = req.params.categoryId;
            console.log("categoryId", categoryId);
            const input = MappingProvider.toDtoObject<UpdateUserFriendCategoryDto>(
                UpdateUserFriendCategoryDto, req.body);
            console.log("result", JSON.stringify(input));
            this.updateUserFriendCategory(categoryId, input)
                .then((data) => {
                    res.json(data);
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        });

        /**
         * @swagger
         * /ts_im_apis/userFriendCategory:
         *   get:
         *     summary: 获取用户
         *     description:
         *     tags:
         *       - userFriendCategory
         *     parameters:
         *       - name: userId
         *         description: 用户ID
         *         in: query
         *         required: true
         *         type: integer
         *       - name: pageNum
         *         description: page number
         *         in: query
         *         required: true
         *         type: integer
         *       - name: pageSize
         *         description: page size
         *         in: query
         *         required: true
         *         type: integer
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: OK
         *         schema:
         *           $ref: '#/definitions/UserFriendCategory'
         */
        routerApi.get("/", (req, res, next) => {
            const userId = req.query.userId;
            const pageNum = req.query.pageNum;
            const pageSize = req.query.pageSize;
            console.log("userId: ", userId);
            console.log("pageNum: ", pageNum);
            console.log("pageSize: ", pageSize);
            this.getUserFriendCategories(userId, pageNum, pageSize)
                .then((data) => {
                    res.json(data);
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        });
        return routerApi;
    }

    private async addUserFriendCategory(addUserFriendCategoryDto: AddUserFriendCategoryDto): Promise<number> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (CommonHelper.isNullOrUndefined(addUserFriendCategoryDto)) {
                throw new Error("DTO cannot be emtpy.");
            }
            if (CommonHelper.isNullOrUndefined(addUserFriendCategoryDto.userId)) {
                throw new Error("用户不能为空。");
            }
            if (CommonHelper.isBlank(addUserFriendCategoryDto.categoryName)) {
                throw new Error("名字不能为空。");
            }
            const entity = this.addDtoToEntity(addUserFriendCategoryDto);
            conn = await this.connectionFactory.getConnection();
            const entityMapper = new UserFriendCategoryMapper(conn);
            const searchSameName = new UserFriendCategory();
            searchSameName.categoryName = addUserFriendCategoryDto.categoryName;
            if (await entityMapper.selectCountByExample(searchSameName) > 0) {
                throw new Error("名字已经存在。");
            }

            await conn.beginTransaction();
            beginTrans = true;
            const effectRows = await entityMapper.insertSelective(entity);
            console.log("effectRows: ", effectRows);
            await conn.commit();
            await conn.release();
            return new Promise<number>((resolve, reject) => resolve(entity.id));
        } catch (error) {
            if (!CommonHelper.isNullOrUndefined(conn)) {
                if (beginTrans) {
                    await conn.rollback();
                }
                await conn.release();
            }
            return new Promise<number>((resolve, reject) => reject(error));
        }
    }

    private async deleteUserFriendCategory(categoryId: number): Promise<void> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (CommonHelper.isNullOrUndefined(categoryId)) {
                throw new Error("'categoryId' cannot be empty");
            }

            conn = await this.connectionFactory.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const entityMapper = new UserFriendCategoryMapper(conn);
            const effectRows = await entityMapper.deleteByPrimaryKey(categoryId);
            console.log("effectRows: ", effectRows);
            await conn.commit();
            await conn.release();
            return new Promise<void>((resolve, reject) => resolve());
        } catch (error) {
            if (!CommonHelper.isNullOrUndefined(conn)) {
                if (beginTrans) {
                    await conn.rollback();
                }
                await conn.release();
            }
            return new Promise<void>((resolve, reject) => reject(error));
        }
    }

    private async updateUserFriendCategory(categoryId: number, updateUserFriendCategoryDto: UpdateUserFriendCategoryDto)
        : Promise<void> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (CommonHelper.isNullOrUndefined(categoryId)) {
                throw new Error("'categoryId' cannot be empty");
            }
            if (CommonHelper.isNullOrUndefined(updateUserFriendCategoryDto)) {
                throw new Error("DTO cannot be empty");
            }

            const entity = this.updateDtoToEntity(categoryId, updateUserFriendCategoryDto);
            conn = await this.connectionFactory.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const entityMapper = new UserFriendCategoryMapper(conn);
            const effectRows = await entityMapper.updateByPrimaryKeySelective(entity);
            console.log("effectRows: ", effectRows);
            await conn.commit();
            await conn.release();
            if (effectRows > 0) {
                return new Promise<void>((resolve, reject) => resolve());
            } else {
                return new Promise<void>((resolve, reject) => reject(`cannot find category, id: ${categoryId}`));
            }
        } catch (error) {
            if (!CommonHelper.isNullOrUndefined(conn)) {
                if (beginTrans) {
                    await conn.rollback();
                }
                await conn.release();
            }
            return new Promise<void>((resolve, reject) => reject(error));
        }
    }

    private async getUserFriendCategories(userId: number, pageNum: number, pageSize: number)
        : Promise<Page<UserFriendCategory>> {
        let conn: IConnection;
        try {
            if (CommonHelper.isNullOrUndefined(userId)) {
                throw new Error(`"userId" cannot be empty.`);
            }
            if (CommonHelper.isNullOrUndefined(pageNum)) {
                throw new Error(`"pageNum" cannot be empty.`);
            }
            if (CommonHelper.isNullOrUndefined(pageSize)) {
                throw new Error(`"pageSize" cannot be emtpy.`);
            }

            const pageRowBounds = new PageRowBounds(pageNum, pageSize);
            conn = await this.connectionFactory.getConnection();

            const entityMapper = new UserFriendCategoryMapper(conn);
            const query = DynamicQuery.createIntance<UserFriendCategory>();
            const indexSort = new SortDescriptor<UserFriendCategory>((u) => u.categoryIndex);
            const createTimeSort = new SortDescriptor<UserFriendCategory>((u) => u.createTime, SortDirection.DESC);
            query.addSorts(indexSort, createTimeSort);
            const result = await entityMapper.selectPageRowBoundsByDynamicQuery(query, pageRowBounds);
            await conn.release();
            return new Promise<Page<UserFriendCategory>>((resolve, reject) => resolve(result));
        } catch (e) {
            if (!CommonHelper.isNullOrUndefined(conn)) {
                await conn.release();
            }
            return new Promise<Page<UserFriendCategory>>((resolve, reject) => reject(e));
        }
    }

    private addDtoToEntity(addUserFriendCategoryDto: AddUserFriendCategoryDto): UserFriendCategory {
        const entity = new UserFriendCategory();
        entity.categoryName = addUserFriendCategoryDto.categoryName;
        entity.userId = addUserFriendCategoryDto.userId;
        entity.createTime = new Date();
        entity.updateTime = entity.createTime;
        entity.categoryIndex = 0; // default on the top
        return entity;
    }

    private updateDtoToEntity(categoryId: number, updateUserFriendCategoryDto: UpdateUserFriendCategoryDto)
        : UserFriendCategory {
        const entity = new UserFriendCategory();
        entity.id = categoryId;
        entity.categoryName = updateUserFriendCategoryDto.categoryName;
        entity.updateTime = new Date();
        return entity;
    }
}
