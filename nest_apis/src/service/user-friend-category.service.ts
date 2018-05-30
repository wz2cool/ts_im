import * as lodash from 'lodash';

import { Component, Injectable } from '@nestjs/common';
import { DbCoreService } from './db-core.service';
import { CreateUserFriendCategoryDto, UpdateUserFriendCategoryDto, UserFriendCategoryDto } from '../model/dto';
import { IConnection, CommonHelper, DynamicQuery, FilterDescriptor, FilterOperator, SortDescriptor, SortDirection } from 'tsbatis';
import { UserDetail } from '../model/entity/table/userDetail';
import { DisplayException } from '../model/exception';
import { UserFriendCategoryMapper } from '../mapper';
import { UserFriend } from '../model/entity/table/userFriend';
import { UserFriendCategory } from '../model/entity/table/userFriendCategory';

@Injectable()
export class UserFriendCategoryService {
    constructor(private readonly dbCoreService: DbCoreService) {
        console.log('UserFriendCategoryService init');
    }

    public async createUserFriendCategory(createUserFriendCategoryDto: CreateUserFriendCategoryDto): Promise<number> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (this.isDtoEmpty(createUserFriendCategoryDto)) {
                throw new DisplayException('参数不能为空');
            }
            const entity = this.createDtoToEntity(createUserFriendCategoryDto);
            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const mapper = new UserFriendCategoryMapper(conn);
            const effectRows = await mapper.insertSelective(entity);
            console.log('effectRows: ', effectRows);
            await conn.commit();
            return new Promise<number>((resolve, reject) => resolve(entity.id));
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

    public async updateUserFriendCategory(userFriendCategoryId: number, updateUserFriendCategoryDto: UpdateUserFriendCategoryDto): Promise<void> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (CommonHelper.isNullOrUndefined(userFriendCategoryId)) {
                throw new DisplayException('"Id" 不能为空。');
            }
            if (this.isDtoEmpty(updateUserFriendCategoryDto)) {
                throw new DisplayException('参数不能为空。');
            }
            const entity = this.updateDtoToEntity(userFriendCategoryId, updateUserFriendCategoryDto);
            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const mapper = new UserFriendCategoryMapper(conn);
            const effectRows = await mapper.updateByPrimaryKeySelective(entity);
            console.log('effectRows: ', effectRows);
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

    public async deleteUserFriendCategory(userFriendCategoryId: number): Promise<void> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (CommonHelper.isNullOrUndefined(userFriendCategoryId)) {
                throw new DisplayException('"Id" 不能为空。');
            }

            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const mapper = new UserFriendCategoryMapper(conn);
            const effectRows = await mapper.deleteByPrimaryKey(userFriendCategoryId);
            console.log('effectRows: ', effectRows);
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

    public async getUserFriendCategoriesByUserId(userId: number): Promise<UserFriendCategoryDto[]> {
        let conn: IConnection;
        try {
            if (CommonHelper.isNullOrUndefined(userId)) {
                throw new DisplayException('"userId" 不能为空。');
            }
            conn = await this.dbCoreService.getConnection();
            const mapper = new UserFriendCategoryMapper(conn);
            const query = DynamicQuery.createIntance<UserFriendCategory>();
            const userIdFilter = new FilterDescriptor<UserFriendCategory>((g) => g.userId, FilterOperator.EQUAL, userId);
            const indexSort = new SortDescriptor<UserFriendCategory>((g) => g.categoryIndex);
            const idSort = new SortDescriptor<UserFriendCategory>((g) => g.id, SortDirection.DESC);
            query.addFilters(userIdFilter);
            query.addSorts(indexSort, idSort);
            const enities = await mapper.selectByDynamicQuery(query);
            await conn.commit();
            const result = lodash.map(enities, x => this.entityToDto(x));
            return new Promise<UserFriendCategoryDto[]>((resolve, reject) => resolve(result));
        } catch (error) {
            return new Promise<UserFriendCategoryDto[]>((resolve, reject) => reject(error));
        } finally {
            if (!CommonHelper.isNullOrUndefined(conn)) {
                await conn.release();
            }
        }
    }

    private isDtoEmpty(dto: any): boolean {
        return CommonHelper.isNullOrUndefined(dto) || JSON.stringify(dto) === '{}';
    }

    private createDtoToEntity(createUserFriendCategoryDto: CreateUserFriendCategoryDto): UserFriendCategory {
        const userFriendCategory = new UserFriendCategory();
        userFriendCategory.categoryIndex = createUserFriendCategoryDto.categoryIndex;
        userFriendCategory.categoryName = createUserFriendCategoryDto.categoryName;
        userFriendCategory.userId = createUserFriendCategoryDto.userId;
        userFriendCategory.createTime = new Date();
        userFriendCategory.updateTime = new Date();
        return userFriendCategory;
    }

    private updateDtoToEntity(userFriendCategoryId: number, updateUserFriendCategoryDto: UpdateUserFriendCategoryDto): UserFriendCategory {
        const userFriendCategory = new UserFriendCategory();
        userFriendCategory.id = userFriendCategoryId;
        userFriendCategory.categoryName = updateUserFriendCategoryDto.categoryName;
        userFriendCategory.categoryIndex = updateUserFriendCategoryDto.categoryIndex;
        userFriendCategory.updateTime = new Date();
        return userFriendCategory;
    }

    private entityToDto(entity: UserFriendCategory): UserFriendCategoryDto {
        const dto = new UserFriendCategoryDto();
        dto.id = entity.id;
        dto.categoryName = entity.categoryName;
        dto.categoryIndex = entity.categoryIndex;
        return dto;
    }
}