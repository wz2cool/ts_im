import { Component, Injectable } from '@nestjs/common';
import { DbCoreService } from './db-core.service';
import {
  CreateUserDetailDto,
  UpdateUserDetailDto,
  CreateUserFriendDto,
} from '../model/dto';
import {
  IConnection,
  DynamicQuery,
  FilterDescriptor,
  FilterOperator,
} from 'tsbatis';
import { UserDetail } from '../model/entity/table/userDetail';
import { DisplayException } from '../model/exception';
import {
  UserDetailMapper,
  UserFriendMapper,
  UserFriendCategoryMapper,
} from '../mapper';
import { UserFriend } from '../model/entity/table/userFriend';
import { DefaultValue } from '../constant';
import { UserFriendCategory } from 'model/entity/table/userFriendCategory';
import { ObjectUtils } from 'ts-commons';

@Injectable()
export class UserFriendService {
  constructor(private readonly dbCoreService: DbCoreService) {
    console.log('UserFriendService init');
  }

  public async createUserFriend(
    createUserFriendDto: CreateUserFriendDto,
  ): Promise<number> {
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
      if (!ObjectUtils.isNullOrUndefined(conn)) {
        await conn.release();
      }
    }
  }

  public async deleteUserFriend(userFirendId: number): Promise<void> {
    let conn: IConnection;
    let beginTrans: boolean = false;
    try {
      if (ObjectUtils.isNullOrUndefined(userFirendId)) {
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
      if (!ObjectUtils.isNullOrUndefined(conn)) {
        await conn.release();
      }
    }
  }

  private isDtoEmpty(dto: any): boolean {
    return ObjectUtils.isNullOrUndefined(dto) || JSON.stringify(dto) === '{}';
  }

  private createDtoToEntity(
    createUserFriendDto: CreateUserFriendDto,
  ): UserFriend {
    const userFriend = new UserFriend();
    userFriend.friendUserId = createUserFriendDto.friendUserId;
    userFriend.userId = createUserFriendDto.userId;
    userFriend.userFriendCategoryId = createUserFriendDto.userFriendCategoryId;
    userFriend.createTime = new Date();
    return userFriend;
  }
}
