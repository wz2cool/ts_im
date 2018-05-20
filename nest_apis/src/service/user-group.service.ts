import { Component } from '@nestjs/common';
import { DbCoreService } from './db-core.service';
import { IConnection, CommonHelper } from 'tsbatis';
import { DisplayException } from '../model/exception';
import { CreateUserGroupDto, UpdateUserGroupDto } from 'model/dto';
import { UserGroup } from 'model/entity/table/user-group';
import { UserGroupMapper } from '../mapper';

@Component()
export class UserGroupCategoryService {
    constructor(private readonly dbCoreService: DbCoreService) {
        console.log('UserGroupService init');
    }

    public async createUserGroup(createUserGroupDto: CreateUserGroupDto): Promise<number> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (this.isDtoEmpty(createUserGroupDto)) {
                throw new DisplayException('参数不能为空');
            }
            const userGroup = this.createDtoToEntity(createUserGroupDto);
            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const mapper = new UserGroupMapper(conn);
            const effectRows = await mapper.insertSelective(userGroup);
            console.log('effectRows: ', effectRows);
            await conn.commit();
            return new Promise<number>((resolve, reject) => resolve(userGroup.id));
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

    public async updateUserGroup(userGroupId: number, updateUserGroupDto: UpdateUserGroupDto): Promise<void> {
        let conn: IConnection;
        let beginTrans: boolean = false;

        try {
            if (this.isDtoEmpty(updateUserGroupDto)) {
                throw new DisplayException('参数不能为空');
            }
            const userGroup = this.updateDtoToEntity(userGroupId, updateUserGroupDto);
            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const mapper = new UserGroupMapper(conn);
            const effectRows = await mapper.updateByPrimaryKeySelective(userGroup);
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

    public async deleteUserGroup(userGroupId: number): Promise<void> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (CommonHelper.isNullOrUndefined(userGroupId)) {
                throw new DisplayException('参数不能为空');
            }
            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const mapper = new UserGroupMapper(conn);
            const effectRows = await mapper.deleteByPrimaryKey(userGroupId);
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

    private isDtoEmpty(dto: any): boolean {
        return CommonHelper.isNullOrUndefined(dto) || JSON.stringify(dto) === '{}';
    }

    private createDtoToEntity(createUserGroupDto: CreateUserGroupDto): UserGroup {
        const userGroup = new UserGroup();
        userGroup.displayName = createUserGroupDto.displayName;
        userGroup.groupId = createUserGroupDto.groupId;
        userGroup.userId = createUserGroupDto.userId;
        userGroup.userGroupCategoryId = createUserGroupDto.userGroupCategoryId;
        userGroup.createTime = new Date();
        userGroup.updateTime = new Date();
        return userGroup;
    }

    private updateDtoToEntity(userGroupId: number, updateUserGroupDto: UpdateUserGroupDto): UserGroup {
        const userGroup = new UserGroup();
        userGroup.id = userGroupId;
        userGroup.displayName = updateUserGroupDto.displayName;
        userGroup.userGroupCategoryId = updateUserGroupDto.userGroupCategoryId;
        userGroup.updateTime = new Date();
        return userGroup;
    }
}