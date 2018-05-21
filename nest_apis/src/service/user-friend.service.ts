import { Component } from '@nestjs/common';
import { DbCoreService } from './db-core.service';
import { CreateUserDetailDto, UpdateUserDetailDto, CreateUserFriendDto } from '../model/dto';
import { IConnection, CommonHelper } from 'tsbatis';
import { UserDetail } from '../model/entity/table/userDetail';
import { DisplayException } from '../model/exception';
import { UserDetailMapper, UserFriendMapper } from '../mapper';
import { UserFriend } from '../model/entity/table/userFriend';

@Component()
export class UserFriendService {
    constructor(private readonly dbCoreService: DbCoreService) {
        console.log('UserFriendService init');
    }

    public async createUserFriend(createUserFriendDto: CreateUserFriendDto): Promise<number> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (this.isDtoEmpty(createUserFriendDto)) {
                throw new DisplayException('参数不能为空');
            }
            const userFriend = this.createDtoToEntity(createUserFriendDto);
            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const mapper = new UserFriendMapper(conn);
            const effectRows = await mapper.insertSelective(userFriend);
            console.log('effectRows: ', effectRows);
            await conn.commit();
            return new Promise<number>((resolve, reject) => resolve(userFriend.id));
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

    public async deleteUserFriend(userFirendId: number): Promise<void> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (CommonHelper.isNullOrUndefined(userFirendId)) {
                throw new DisplayException('参数不能为空');
            }
            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const mapper = new UserFriendMapper(conn);
            const effectRows = await mapper.deleteByPrimaryKey(userFirendId);
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

    private createDtoToEntity(createUserDetailDto: CreateUserFriendDto): UserFriend {
        const userFriend = new UserFriend();
        userFriend.friendUserId = createUserDetailDto.friendUserId;
        userFriend.userId = createUserDetailDto.userId;
        userFriend.createTime = new Date();
        return userFriend;
    }
}
