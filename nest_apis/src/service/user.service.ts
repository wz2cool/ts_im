import { Component } from '@nestjs/common';
import { DbCoreService } from './db-core.service';
import { CreateUserDto, UpdateUserDto } from 'model/dto';
import { IConnection, CommonHelper } from 'tsbatis';
import { User } from '../model/entity/table/user';
import { Deleted, DefaultValue } from '../constant';
import { DisplayException } from '../model/exception';
import { UserMapper, UserFriendCategoryMapper, UserGroupCategoryMapper } from '../mapper';
import { UserFriendCategory } from '../model/entity/table/userFriendCategory';
import { UserGroupCategory } from '../model/entity/table/user-group-category';

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

    private isDtoEmpty(dto: any): boolean {
        return CommonHelper.isNullOrUndefined(dto) || JSON.stringify(dto) === '{}';
    }

    private createDtoToEntity(createUserDto: CreateUserDto): User {
        const user = new User();
        user.displayName = createUserDto.displayName;
        user.email = createUserDto.email;
        user.mobile = createUserDto.mobile;
        user.password = createUserDto.mobile;
        user.userName = createUserDto.userName;
        user.createTime = new Date();
        user.updateTime = new Date();
        return user;
    }

    private updateDtoToEntity(userId: number, UpdateUserDto: UpdateUserDto): User {
        const user = new User();
        user.id = userId;
        user.displayName = UpdateUserDto.displayName;
        user.email = UpdateUserDto.email;
        user.mobile = UpdateUserDto.mobile;
        user.password = UpdateUserDto.mobile;
        user.updateTime = new Date();
        return user;
    }
}