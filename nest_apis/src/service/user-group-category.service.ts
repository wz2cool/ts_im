import * as lodash from 'lodash';
import { Component } from '@nestjs/common';
import { DbCoreService } from './db-core.service';
import { CreateGroupDto, UpdateGroupDto, GroupDto, GroupPageDto, CreateUserGroupCategoryDto, UpdateUserGroupCategoryDto } from '../model/dto';
import {
    CommonHelper,
    IConnection,
    Page,
    PageRowBounds,
    DynamicQuery,
    SortDescriptor,
    SortDirection,
    FilterDescriptor,
    FilterOperator,
} from 'tsbatis';
import { UserGroupCategory } from '../model/entity/table/user-group-category';
import { GroupMapper, UserGroupCategoryMapper, UserGroupMapper } from '../mapper';
import { DisplayException } from '../model/exception';
import { Group } from '../model/entity/table/group';
import { UserGroup } from '../model/entity/table/user-group';

@Component()
export class UserGroupCategoryService {
    constructor(private readonly dbCoreService: DbCoreService) {
        console.log('UserGroupService init');
    }

    public async createUserGroupCategory(createUserGroupCategoryDto: CreateUserGroupCategoryDto): Promise<number> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (this.isDtoEmpty(createUserGroupCategoryDto)) {
                throw new DisplayException('参数不能为空');
            }
            const userGroupCategory = this.createDtoToEntity(createUserGroupCategoryDto);
            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const userGroupCategoryMapper = new UserGroupCategoryMapper(conn);
            const effectRows = await userGroupCategoryMapper.insertSelective(userGroupCategory);
            console.log('effectRows: ', effectRows);
            await conn.commit();
            return new Promise<number>((resolve, reject) => resolve(userGroupCategory.id));
        } catch (error) {
            if (beginTrans) {
                await conn.rollback();
            }
            return new Promise<number>((resolve, reject) => reject(error));
        } finally {
            if (!CommonHelper.isNullOrUndefined(conn)) {
                await conn.release();
            }
        }
    }

    public async updateUserGroupCategory(userGroupCategoryId: number, updateUserGroupCategory: UpdateUserGroupCategoryDto): Promise<void> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (CommonHelper.isNullOrUndefined(userGroupCategoryId)) {
                throw new DisplayException('"Id" 不能为空。');
            }
            if (this.isDtoEmpty(updateUserGroupCategory)) {
                throw new DisplayException('参数不能为空。');
            }
            const entity = this.updateDtoToEntity(userGroupCategoryId, updateUserGroupCategory);
            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const mapper = new UserGroupCategoryMapper(conn);
            const effectRows = await mapper.updateByPrimaryKeySelective(entity);
            console.log('effectRows: ', effectRows);
            if (effectRows === 0) {
                throw new DisplayException(`未能找到对应的分组。id: ${userGroupCategoryId}`);
            }
            await conn.commit();
            return new Promise<void>((resolve, reject) => resolve());
        } catch (error) {
            if (beginTrans) {
                await conn.rollback();
            }
            return new Promise<void>((resolve, reject) => reject(error));
        } finally {
            if (!CommonHelper.isNullOrUndefined(conn)) {
            }
            await conn.release();
        }
    }

    public async deleteUserGroupCategory(userGroupCategoryId: number): Promise<void> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (CommonHelper.isNullOrUndefined(userGroupCategoryId)) {
                throw new DisplayException('"userGroupCategoryId" 不能为空。');
            }

            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const mapper = new UserGroupCategoryMapper(conn);
            const effectRows = await mapper.deleteByPrimaryKey(userGroupCategoryId);
            console.log('effectRows: ', effectRows);
            if (effectRows === 0) {
                throw new DisplayException(`未能找到对应的分组。id: ${userGroupCategoryId}`);
            }
            await conn.commit();
            return new Promise<void>((resolve, reject) => resolve());
        } catch (error) {
            if (beginTrans) {
                await conn.rollback();
            }
            return new Promise<void>((resolve, reject) => reject(error));
        } finally {
            if (!CommonHelper.isNullOrUndefined(conn)) {
                await conn.release();
            }
        }
    }

    private isDtoEmpty(dto: any): boolean {
        return CommonHelper.isNullOrUndefined(dto) || JSON.stringify(dto) === '{}';
    }

    private createDtoToEntity(createUserGroupCategoryDto: CreateUserGroupCategoryDto): UserGroupCategory {
        const userGroupCategory = new UserGroupCategory();
        userGroupCategory.categoryIndex = createUserGroupCategoryDto.categoryIndex;
        userGroupCategory.categoryName = createUserGroupCategoryDto.categoryName;
        userGroupCategory.userId = createUserGroupCategoryDto.userId;
        userGroupCategory.createTime = new Date();
        userGroupCategory.updateTime = new Date();
        return userGroupCategory;
    }

    private updateDtoToEntity(userGroupCategoryId: number, updateUserGroupCategoryDto: UpdateUserGroupCategoryDto): UserGroupCategory {
        const userGroupCategory = new UserGroupCategory();
        userGroupCategory.id = userGroupCategoryId;
        userGroupCategory.categoryName = updateUserGroupCategoryDto.categoryName;
        userGroupCategory.categoryIndex = updateUserGroupCategoryDto.categoryIndex;
        userGroupCategory.updateTime = new Date();
        return userGroupCategory;
    }
}