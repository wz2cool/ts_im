import * as express from "express";
import {
    CommonHelper,
    ConnectionFactory,
    DynamicQuery,
    MappingProvider,
    Page,
    PageRowBounds,
    SortDescriptor,
    SortDirection,
} from "tsbatis";
import { myContainer } from "../ioc/inversify.config";
import { GroupMapper } from "../mappers/groupMapper";
import { AddGroupDto } from "../models/dto/addGroupDto";
import { UpdateGroupDto } from "../models/dto/updateGroupDto";
import { Group } from "../models/entities/tables/group";

export class GroupApi {
    private readonly connectionFactory: ConnectionFactory;
    constructor() {
        this.connectionFactory = myContainer.get<ConnectionFactory>(ConnectionFactory);
    }

    public getRoute(): express.Router {
        const groupApi = express.Router();
        /**
         * @swagger
         * definitions:
         *   AddGroupDto:
         *     type: object
         *     required:
         *       - groupName
         *       - subject
         *       - canInvite
         *       - canRegister
         *       - publicGroup
         *     properties:
         *       groupName:
         *         type: string
         *       subject:
         *         type: string
         *       canInvite:
         *         type: boolean
         *       canRegister:
         *         type: boolean
         *       publicGroup:
         *         type: boolean
         *       description:
         *         type: string
         *   UpdateGroupDto:
         *     type: object
         *     required:
         *       - groupName
         *       - subject
         *       - canInvite
         *       - canRegister
         *       - publicGroup
         *     properties:
         *       groupName:
         *         type: string
         *       subject:
         *         type: string
         *       canInvite:
         *         type: boolean
         *       canRegister:
         *         type: boolean
         *       publicGroup:
         *         type: boolean
         *       description:
         *         type: string
         *   Group:
         *     type: object
         *     properties:
         *       id:
         *         type: number
         *       groupName:
         *         type: string
         *       subject:
         *         type: string
         *       description:
         *         type: string
         *       canInvite:
         *         type: number
         *       canRegister:
         *         type: number
         *       maxUser:
         *         type: number
         *       publicGroup:
         *         type: number
         *       createTime:
         *         type: Date
         *       updateTime:
         *         type: Date
         */

        /**
         * @swagger
         * tags:
         *   name: Group
         *   description: All about /Groups
         */

        /**
         * @swagger
         * /ts_im_apis/groups:
         *   post:
         *     summary: Add Group
         *     description: Add group by AddGroupDto
         *     tags: [Groups]
         *     parameters:
         *       - name: group
         *         description: Group object
         *         in: body
         *         required: true
         *         schema:
         *           $ref: '#/definitions/AddGroupDto'
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Success add group
         */
        groupApi.post("/", (req, res, next) => {
            console.log("body", JSON.stringify(req.body));
            const input = MappingProvider.toDtoObject<AddGroupDto>(AddGroupDto, req.body);
            console.log("result", JSON.stringify(input));
            this.addGroup(input)
                .then((data) => {
                    res.json(data);
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        });

        /**
         * @swagger
         * /ts_im_apis/groups/{groupId}:
         *   delete:
         *     summary: delete Group
         *     description: delete group by id
         *     tags: [Groups]
         *     parameters:
         *       - name: groupId
         *         description: id of group
         *         in: path
         *         required: true
         *         type: integer
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Success delete group
         */
        groupApi.delete("/:groupId", (req, res, next) => {
            const groupId = req.params.groupId;
            console.log("groupId", groupId);
            this.deleteGroup(groupId)
                .then((data) => {
                    res.json(data);
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        });

        /**
         * @swagger
         * /ts_im_apis/groups/{groupId}:
         *   put:
         *     summary: update Group
         *     description: update group by id
         *     tags: [Groups]
         *     parameters:
         *       - name: groupId
         *         description: id of group
         *         in: path
         *         required: true
         *         type: integer
         *       - name: group
         *         description: Group object
         *         in: body
         *         required: true
         *         schema:
         *           $ref: '#/definitions/UpdateGroupDto'
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Success delete group
         */
        groupApi.put("/:groupId", (req, res, next) => {
            const groupId = req.params.groupId;
            console.log("groupId", groupId);
            const input = MappingProvider.toDtoObject<UpdateGroupDto>(UpdateGroupDto, req.body);
            console.log("result", JSON.stringify(input));
            this.updateGroup(groupId, input)
                .then((data) => {
                    res.json(data);
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        });

        /**
         * @swagger
         * /ts_im_apis/groups:
         *   get:
         *     summary: get Groups
         *     description: getGroups
         *     tags: [Groups]
         *     parameters:
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
         *         description: Success get groups
         *         schema:
         *           $ref: '#/definitions/Group'
         */
        groupApi.get("/", (req, res, next) => {
            const pageNum = req.query.pageNum;
            const pageSize = req.query.pageSize;
            console.log("pageNum: ", pageNum);
            console.log("pageSize: ", pageSize);
            this.getGroups(pageNum, pageSize)
                .then((data) => {
                    res.json(data);
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        });

        return groupApi;
    }

    private async addGroup(addGroupDto: AddGroupDto): Promise<number> {
        if (CommonHelper.isNullOrUndefined(addGroupDto)) {
            return new Promise<number>((resolve, reject) => resolve(0));
        }

        const group = this.addDtoToEntity(addGroupDto);
        try {
            const conn = await this.connectionFactory.getConnection();
            try {
                await conn.beginTransaction();
                const groupMapper = new GroupMapper(conn);
                const effectRows = await groupMapper.insertSelective(group);
                console.log("effectRows: ", effectRows);
                await conn.commit();
                await conn.release();
                return new Promise<number>((resolve, reject) => resolve(group.id));
            } catch (beginTransError) {
                await conn.release();
                return new Promise<number>((resolve, reject) => reject(beginTransError));
            }
        } catch (getConnError) {
            return new Promise<number>((resolve, reject) => reject(getConnError));
        }
    }

    private async updateGroup(groupId: number, updateGroupDto: UpdateGroupDto): Promise<void> {
        if (CommonHelper.isNullOrUndefined(groupId)) {
            return new Promise<void>((resolve, reject) => reject("'groupId' cannot be empty"));
        }
        if (CommonHelper.isNullOrUndefined(updateGroupDto)) {
            return new Promise<void>((resolve, reject) => resolve());
        }

        const group = this.updateDtoToEntity(groupId, updateGroupDto);
        try {
            const conn = await this.connectionFactory.getConnection();
            try {
                await conn.beginTransaction();
                const groupMapper = new GroupMapper(conn);
                const effectRows = await groupMapper.updateByPrimaryKeySelective(group);
                console.log("effectRows: ", effectRows);
                await conn.commit();
                await conn.release();
                return new Promise<void>((resolve, reject) => resolve());
            } catch (beginTransError) {
                await conn.release();
                return new Promise<void>((resolve, reject) => reject(beginTransError));
            }
        } catch (getConnError) {
            return new Promise<void>((resolve, reject) => reject(getConnError));
        }
    }

    private async deleteGroup(groupId: number): Promise<void> {
        if (CommonHelper.isNullOrUndefined(groupId)) {
            return new Promise<void>((resolve, reject) => reject("'groupId' cannot be empty"));
        }

        try {
            const conn = await this.connectionFactory.getConnection();
            try {
                await conn.beginTransaction();
                const groupMapper = new GroupMapper(conn);
                const effectRows = await groupMapper.deleteByPrimaryKey(groupId);
                console.log("effectRows: ", effectRows);
                await conn.commit();
                await conn.release();
                return new Promise<void>((resolve, reject) => resolve());
            } catch (beginTransError) {
                await conn.release();
                return new Promise<void>((resolve, reject) => reject(beginTransError));
            }
        } catch (getConnError) {
            return new Promise<void>((resolve, reject) => reject(getConnError));
        }
    }

    private async getGroups(pageNum: number, pageSize: number): Promise<Page<Group>> {
        try {
            if (CommonHelper.isNullOrUndefined(pageNum)) {
                throw new Error(`"pageNum" cannot be empty.`);
            }
            if (CommonHelper.isNullOrUndefined(pageSize)) {
                throw new Error(`"pageSize" cannot be empty.`);
            }

            const pageRowBounds = new PageRowBounds(pageNum, pageSize);
            const conn = await this.connectionFactory.getConnection();
            try {
                const groupMapper = new GroupMapper(conn);
                const query = DynamicQuery.createIntance<Group>();
                const idSort = new SortDescriptor<Group>((g) => g.id, SortDirection.DESC);
                query.addSorts(idSort);
                const result = await groupMapper.selectPageRowBoundsByDynamicQuery(query, pageRowBounds);
                await conn.release();
                return new Promise<Page<Group>>((resolve, reject) => resolve(result));
            } catch (e) {
                await conn.release();
                return new Promise<Page<Group>>((resolve, reject) => reject(e));
            }
        } catch (e) {
            return new Promise<Page<Group>>((resolve, reject) => reject(e));
        }
    }

    private addDtoToEntity(addGroupDto: AddGroupDto): Group {
        const group = new Group();
        group.canInvite = addGroupDto.canInvite ? 1 : 0;
        group.canRegister = addGroupDto.canRegister ? 1 : 0;
        group.publicGroup = addGroupDto.publicGroup ? 1 : 0;
        group.createTime = new Date();
        group.updateTime = new Date();
        group.description = addGroupDto.description;
        group.maxUser = 100; // default 100
        group.subject = addGroupDto.subject;
        group.groupName = addGroupDto.groupName;
        return group;
    }

    private updateDtoToEntity(groupId: number, updateGroupDto: UpdateGroupDto): Group {
        const group = new Group();
        group.id = groupId;
        if (!CommonHelper.isNullOrUndefined(updateGroupDto.canInvite)) {
            group.canInvite = updateGroupDto.canInvite ? 1 : 0;
        }
        if (!CommonHelper.isNullOrUndefined(updateGroupDto.canRegister)) {
            group.canRegister = updateGroupDto.canRegister ? 1 : 0;
        }
        if (!CommonHelper.isNullOrUndefined(updateGroupDto.publicGroup)) {
            group.publicGroup = updateGroupDto.publicGroup ? 1 : 0;
        }
        group.updateTime = new Date();
        group.description = updateGroupDto.description;
        group.subject = updateGroupDto.subject;
        group.groupName = updateGroupDto.groupName;
        return group;
    }
}
