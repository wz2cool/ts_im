import * as lodash from 'lodash';

import { Injectable } from '@nestjs/common';
import { DbCoreService } from './db-core.service';
import {
  IConnection,
  DynamicQuery,
  FilterDescriptor,
  FilterOperator,
} from 'tsbatis';
import { DisplayException } from '../model/exception';
import {
  CreateUserGroupDto,
  UpdateUserGroupDto,
  UserGroupDto,
} from '../model/dto';
import { UserGroup } from '../model/entity/table/user-group';
import { UserGroupMapper, GroupMapper } from '../mapper';
import { Group } from '../model/entity/table/group';
import { ObjectUtils } from 'ts-commons';

@Injectable()
export class UserGroupService {
  constructor(private readonly dbCoreService: DbCoreService) {
    console.log('UserGroupService init');
  }

  public async createUserGroup(
    createUserGroupDto: CreateUserGroupDto,
  ): Promise<number> {
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
      if (!ObjectUtils.isNullOrUndefined(conn)) {
        await conn.release();
      }
    }
  }

  public async updateUserGroup(
    userGroupId: number,
    updateUserGroupDto: UpdateUserGroupDto,
  ): Promise<void> {
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
      if (!ObjectUtils.isNullOrUndefined(conn)) {
        await conn.release();
      }
    }
  }

  public async deleteUserGroup(userGroupId: number): Promise<void> {
    let conn: IConnection;
    let beginTrans: boolean = false;
    try {
      if (ObjectUtils.isNullOrUndefined(userGroupId)) {
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
      if (!ObjectUtils.isNullOrUndefined(conn)) {
        await conn.release();
      }
    }
  }

  public async getGroupsByUserCategoryId(
    userGroupCategoryId: number,
  ): Promise<UserGroupDto[]> {
    let conn: IConnection;
    try {
      if (ObjectUtils.isNullOrUndefined(userGroupCategoryId)) {
        throw new DisplayException('"userGroupCategoryId" 不能为空。');
      }

      conn = await this.dbCoreService.getConnection();
      const userGroupMapper = new UserGroupMapper(conn);
      const userGroupquery = DynamicQuery.createIntance<UserGroup>();
      const categoryIdFilter = new FilterDescriptor<UserGroup>(
        g => g.userGroupCategoryId,
        FilterOperator.EQUAL,
        userGroupCategoryId,
      );
      userGroupquery.addFilters(categoryIdFilter);
      const userGroups = await userGroupMapper.selectByDynamicQuery(
        userGroupquery,
      );
      const groupIds = lodash.map(userGroups, x => x.groupId);
      if (groupIds.length === 0) {
        return new Promise<UserGroupDto[]>((resolve, reject) => resolve([]));
      }

      const groupMapper = new GroupMapper(conn);
      const groupQuery = DynamicQuery.createIntance<Group>();
      const gorupIdFilter = new FilterDescriptor<Group>(
        g => g.id,
        FilterOperator.IN,
        groupIds,
      );
      const groups = await groupMapper.selectByDynamicQuery(groupQuery);
      const userGroupDtos = lodash.map(userGroups, x => {
        const matchGroup = lodash.find(groups, y => y.id === x.groupId);
        if (matchGroup != null) {
          return this.entityToDto(x, matchGroup);
        } else {
          return null;
        }
      });
      const result = lodash.filter(
        userGroupDtos,
        x => !ObjectUtils.isNullOrUndefined(x),
      );
      return new Promise<UserGroupDto[]>((resolve, reject) => resolve(result));
    } catch (error) {
      return new Promise<UserGroupDto[]>((resolve, reject) => reject(error));
    } finally {
      if (!ObjectUtils.isNullOrUndefined(conn)) {
        await conn.release();
      }
    }
  }

  private isDtoEmpty(dto: any): boolean {
    return ObjectUtils.isNullOrUndefined(dto) || JSON.stringify(dto) === '{}';
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

  private updateDtoToEntity(
    userGroupId: number,
    updateUserGroupDto: UpdateUserGroupDto,
  ): UserGroup {
    const userGroup = new UserGroup();
    userGroup.id = userGroupId;
    userGroup.displayName = updateUserGroupDto.displayName;
    userGroup.userGroupCategoryId = updateUserGroupDto.userGroupCategoryId;
    userGroup.updateTime = new Date();
    return userGroup;
  }

  private entityToDto(entity: UserGroup, group: Group): UserGroupDto {
    const dto = new UserGroupDto();
    dto.id = entity.id;
    dto.displayName = entity.displayName;
    dto.groupId = entity.groupId;
    dto.groupName = group.groupName;
    dto.userGroupCategoryId = entity.userGroupCategoryId;
    dto.userId = entity.userId;
    dto.createTime = entity.createTime;
    dto.updateTime = entity.updateTime;
    return dto;
  }
}
