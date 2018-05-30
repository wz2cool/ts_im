import * as lodash from 'lodash';
import * as crypto from 'crypto';

import { Component, Query } from '@nestjs/common';
import { DbCoreService } from './db-core.service';
import { CreateUserDto, UpdateUserDto, UserBaseInfoDto, UserLoginInfoDto } from '../model/dto';
import {
    IConnection,
    CommonHelper,
    DynamicQuery,
    FilterDescriptor,
    FilterOperator,
    SortDescriptor,
    SortDirection,
    FilterGroupDescriptor,
    FilterCondition,
} from 'tsbatis';
import { User } from '../model/entity/table/user';
import { Deleted, DefaultValue } from '../constant';
import { DisplayException } from '../model/exception';
import { UserMapper, UserFriendCategoryMapper, UserGroupCategoryMapper, UserFriendMapper } from '../mapper';
import { UserFriendCategory } from '../model/entity/table/userFriendCategory';
import { UserGroupCategory } from '../model/entity/table/user-group-category';
import { UserFriend } from 'model/entity/table/userFriend';

@Component()
export class UserService {
    constructor(
        private readonly dbCoreService: DbCoreService) {
        console.log('UserService init');
    }

    public async createUser(createUserDto: CreateUserDto): Promise<number> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (this.isDtoEmpty(createUserDto)) {
                throw new DisplayException('参数不能为空');
            }
            const user = this.createDtoToEntity(createUserDto);
            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const userMapper = new UserMapper(conn);
            let effectRows = await userMapper.insertSelective(user);
            console.log('create user: ', effectRows);

            // create defualt user Category
            const userFriendCategoryMapper = new UserFriendCategoryMapper(conn);
            const userFriendCategoryEntity = new UserFriendCategory();
            userFriendCategoryEntity.userId = user.id;
            userFriendCategoryEntity.categoryIndex = DefaultValue.NO_FRIEND_CATEGORY_INDEX;
            userFriendCategoryEntity.categoryName = DefaultValue.NO_FRIEND_CATEGROY_NAME;
            userFriendCategoryEntity.createTime = new Date();
            userFriendCategoryEntity.updateTime = new Date();
            effectRows = await userFriendCategoryMapper.insertSelective(userFriendCategoryEntity);
            console.log('create default user category: ', effectRows);

            // create default group category
            const userGroupCategoryMapper = new UserGroupCategoryMapper(conn);
            const userGroupCategoryEntity = new UserGroupCategory();
            userGroupCategoryEntity.userId = user.id;
            userGroupCategoryEntity.categoryIndex = DefaultValue.NO_GROUP_CATEGORY_INDEX;
            userGroupCategoryEntity.categoryName = DefaultValue.NO_GROUP_CATEGORY_NAME;
            userGroupCategoryEntity.createTime = new Date();
            userGroupCategoryEntity.updateTime = new Date();
            effectRows = await userGroupCategoryMapper.insertSelective(userGroupCategoryEntity);
            console.log('create default group category: ', effectRows);
            await conn.commit();
            return new Promise<number>((resolve, reject) => resolve(user.id));
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

    public async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<void> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            const user = this.updateDtoToEntity(userId, updateUserDto);
            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const mapper = new UserMapper(conn);
            const effectRows = await mapper.updateByPrimaryKeySelective(user);
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

    public async deleteUser(userId: number): Promise<void> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const mapper = new UserMapper(conn);
            const effectRows = await mapper.deleteByPrimaryKey(userId);
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

    public async getUsersByUserFriendCategoryId(userFriendCategoryId: number): Promise<UserBaseInfoDto[]> {
        let conn: IConnection;
        try {
            conn = await this.dbCoreService.getConnection();
            const userFiendMapper = new UserFriendMapper(conn);
            const userFriendQuery = DynamicQuery.createIntance<UserFriend>();
            const categoryIdFilter = new FilterDescriptor<UserFriend>(
                (g) => g.userFriendCategoryId, FilterOperator.EQUAL, userFriendCategoryId);
            userFriendQuery.addFilters(categoryIdFilter);
            const userFriendEntities = await userFiendMapper.selectByDynamicQuery(userFriendQuery);
            if (userFriendEntities.length === 0) {
                return new Promise<UserBaseInfoDto[]>((resolve, reject) => resolve([]));
            }
            const friendIds = lodash.map(userFriendEntities, x => x.friendUserId);
            const userMapper = new UserMapper(conn);
            const userQuery = DynamicQuery.createIntance<User>();
            const userIdFilter = new FilterDescriptor<User>((g) => g.id, FilterOperator.IN, friendIds);
            // TODO: need order by online.
            const idSort = new SortDescriptor<User>((g) => g.id, SortDirection.DESC);
            userQuery.addFilters(userIdFilter);
            userQuery.addSorts(idSort);
            const userEntities = await userMapper.selectByDynamicQuery(userQuery);
            const result = lodash.map(userEntities, x => this.entityToUserBaseInfoDto(x));
            return new Promise<UserBaseInfoDto[]>((resolve, reject) => resolve(result));
        } catch (error) {
            return new Promise<UserBaseInfoDto[]>((resolve, reject) => reject(error));
        } finally {
            if (!CommonHelper.isNullOrUndefined(conn)) {
                await conn.release();
            }
        }
    }

    public async getUserByLoginInfo(userLoginInfo: UserLoginInfoDto): Promise<User> {
        let conn: IConnection;
        try {
            if (this.isDtoEmpty(userLoginInfo)) {
                throw new DisplayException('参数不能为空');
            }

            conn = await this.dbCoreService.getConnection();
            const userMapper = new UserMapper(conn);
            const query = DynamicQuery.createIntance<User>();
            const md5Pwd = this.cryptPwd(userLoginInfo.password);
            const passwordFilter = new FilterDescriptor<User>((g) => g.password, FilterOperator.EQUAL, md5Pwd);
            const identityFilterGroup = new FilterGroupDescriptor();
            const userNameFilter = new FilterDescriptor<User>(
                FilterCondition.OR, (g) => g.userName, FilterOperator.EQUAL, userLoginInfo.identity);
            const emailFilter = new FilterDescriptor<User>(
                FilterCondition.OR, (g) => g.email, FilterOperator.EQUAL, userLoginInfo.identity);
            const mobileFilter = new FilterDescriptor<User>(
                FilterCondition.OR, (g) => g.mobile, FilterOperator.EQUAL, userLoginInfo.identity);
            identityFilterGroup.filters.push(userNameFilter, emailFilter, mobileFilter);
            query.addFilters(passwordFilter, identityFilterGroup);
            const userEntities = await userMapper.selectByDynamicQuery(query);
            const result = userEntities.length === 0 ? null : userEntities[0];
            return new Promise<User>((resolve, reject) => resolve(result));
        } catch (error) {
            return new Promise<User>((resolve, reject) => reject(error));
        } finally {
            if (!CommonHelper.isNullOrUndefined(conn)) {
                await conn.release();
            }
        }
    }

    private isDtoEmpty(dto: any): boolean {
        return CommonHelper.isNullOrUndefined(dto) || JSON.stringify(dto) === '{}';
    }

    private createDtoToEntity(createUserDto: CreateUserDto): User {
        const user = new User();
        user.displayName = createUserDto.displayName;
        user.email = createUserDto.email;
        user.mobile = createUserDto.mobile;
        user.password = this.cryptPwd(createUserDto.password);
        user.userName = createUserDto.userName;
        user.imageUrl = createUserDto.imageUrl;
        user.createTime = new Date();
        user.updateTime = new Date();
        return user;
    }

    private updateDtoToEntity(userId: number, updateUserDto: UpdateUserDto): User {
        const user = new User();
        user.id = userId;
        user.displayName = updateUserDto.displayName;
        user.email = updateUserDto.email;
        user.mobile = updateUserDto.mobile;
        user.password = this.cryptPwd(updateUserDto.password);
        user.imageUrl = updateUserDto.imageUrl;
        user.updateTime = new Date();
        return user;
    }

    private entityToUserBaseInfoDto(user: User): UserBaseInfoDto {
        const dto = new UserBaseInfoDto();
        dto.id = user.id;
        dto.displayName = user.displayName;
        dto.userName = user.userName;
        dto.imageUrl = user.imageUrl;
        return dto;
    }

    private cryptPwd(password: string): string {
        const md5 = crypto.createHash('md5');
        return md5.update(password).digest('hex');
    }
}