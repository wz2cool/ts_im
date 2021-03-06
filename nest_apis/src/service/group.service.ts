import * as lodash from 'lodash';
import { Component, Injectable } from '@nestjs/common';
import { DbCoreService } from './db-core.service';
import {
  CreateGroupDto,
  UpdateGroupDto,
  GroupDto,
  GroupPageDto,
} from '../model/dto';
import {
  IConnection,
  Page,
  PageRowBounds,
  DynamicQuery,
  SortDescriptor,
  SortDirection,
} from 'tsbatis';
import { Group } from '../model/entity/table/group';
import { GroupMapper, UserGroupMapper } from '../mapper';
import { DisplayException } from '../model/exception';
import { UserGroup } from '../model/entity/table/user-group';
import { ObjectUtils } from 'ts-commons';

@Injectable()
export class GroupService {
  constructor(private readonly dbCoreService: DbCoreService) {
    console.log('GroupDbService init');
  }

  public async createGroup(createGroupDto: CreateGroupDto): Promise<number> {
    let conn: IConnection;
    let beginTrans: boolean = false;
    try {
      if (this.isDtoEmpty(createGroupDto)) {
        throw new DisplayException('参数不能为空');
      }
      const group = this.createDtoToEntity(createGroupDto);
      conn = await this.dbCoreService.getConnection();
      await conn.beginTransaction();
      beginTrans = true;
      const groupMapper = new GroupMapper(conn);
      const effectRows = await groupMapper.insertSelective(group);
      console.log('effectRows: ', effectRows);
      await conn.commit();
      return new Promise<number>((resolve, reject) => resolve(group.id));
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

  public async updateGroup(
    groupId: number,
    updateGroupDto: UpdateGroupDto,
  ): Promise<void> {
    let conn: IConnection;
    let beginTrans: boolean = false;
    try {
      if (ObjectUtils.isNullOrUndefined(groupId)) {
        throw new DisplayException('"groupId" 不能为空。');
      }
      if (this.isDtoEmpty(updateGroupDto)) {
        throw new DisplayException('参数不能为空。');
      }
      const group = this.updateDtoToEntity(groupId, updateGroupDto);
      conn = await this.dbCoreService.getConnection();
      await conn.beginTransaction();
      beginTrans = true;
      const groupMapper = new GroupMapper(conn);
      const effectRows = await groupMapper.updateByPrimaryKeySelective(group);
      console.log('effectRows: ', effectRows);
      if (effectRows === 0) {
        throw new DisplayException(`未能找到对应的组。id: ${groupId}`);
      }
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

  private async deleteGroup(groupId: number): Promise<void> {
    let conn: IConnection;
    let beginTrans: boolean = false;
    try {
      if (ObjectUtils.isNullOrUndefined(groupId)) {
        throw new DisplayException('"groupId" 不能为空。');
      }

      conn = await this.dbCoreService.getConnection();
      await conn.beginTransaction();
      beginTrans = true;
      const groupMapper = new GroupMapper(conn);
      const effectRows = await groupMapper.deleteByPrimaryKey(groupId);
      console.log('effectRows: ', effectRows);
      if (effectRows === 0) {
        throw new DisplayException(`未能找到对应的组。id: ${groupId}`);
      }
      await conn.commit();
      await conn.release();
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

  public async getGroups(
    pageNum: number,
    pageSize: number,
  ): Promise<GroupPageDto> {
    let conn: IConnection;
    try {
      if (ObjectUtils.isNullOrUndefined(pageNum)) {
        throw new DisplayException('"pageNum" 不能为空。');
      }
      if (ObjectUtils.isNullOrUndefined(pageSize)) {
        throw new DisplayException('"pageSize" 不能为空。');
      }
      const pageRowBounds = new PageRowBounds(pageNum, pageSize);
      conn = await this.dbCoreService.getConnection();
      const groupMapper = new GroupMapper(conn);
      const query = DynamicQuery.createIntance<Group>();
      const idSort = new SortDescriptor<Group>(g => g.id, SortDirection.DESC);
      query.addSorts(idSort);
      const groupPage = await groupMapper.selectPageRowBoundsByDynamicQuery(
        query,
        pageRowBounds,
      );
      const result = this.groupPageToGroupPageDto(groupPage);
      return new Promise<GroupPageDto>((resolve, reject) => resolve(result));
    } catch (error) {
      return new Promise<GroupPageDto>((resolve, reject) => reject(error));
    } finally {
      if (!ObjectUtils.isNullOrUndefined(conn)) {
        await conn.release();
      }
    }
  }

  public async getGroupById(groupId: number): Promise<GroupDto> {
    let conn: IConnection;
    try {
      if (ObjectUtils.isNullOrUndefined(groupId)) {
        throw new DisplayException('"groupId" 不能为空。');
      }
      conn = await this.dbCoreService.getConnection();
      const groupMapper = new GroupMapper(conn);
      const group = await groupMapper.selectByPrimaryKey(groupId);
      const result = this.entityToDto(group);
      return new Promise<GroupDto>((resolve, reject) => resolve(result));
    } catch (error) {
      return new Promise<GroupDto>((resolve, reject) => reject(error));
    } finally {
      if (!ObjectUtils.isNullOrUndefined(conn)) {
        await conn.release();
      }
    }
  }

  private isDtoEmpty(dto: any): boolean {
    return ObjectUtils.isNullOrUndefined(dto) || JSON.stringify(dto) === '{}';
  }

  private createDtoToEntity(createGroupDto: CreateGroupDto): Group {
    const group = new Group();
    group.canInvite = createGroupDto.canInvite ? 1 : 0;
    group.canRegister = createGroupDto.canRegister ? 1 : 0;
    group.publicGroup = createGroupDto.publicGroup ? 1 : 0;
    group.createTime = new Date();
    group.updateTime = new Date();
    group.description = createGroupDto.description;
    group.maxUser = 100; // default 100
    group.subject = createGroupDto.subject;
    group.groupName = createGroupDto.groupName;
    return group;
  }

  private updateDtoToEntity(
    groupId: number,
    updateGroupDto: UpdateGroupDto,
  ): Group {
    const group = new Group();
    group.id = groupId;
    if (!ObjectUtils.isNullOrUndefined(updateGroupDto.canInvite)) {
      group.canInvite = updateGroupDto.canInvite ? 1 : 0;
    }
    if (!ObjectUtils.isNullOrUndefined(updateGroupDto.canRegister)) {
      group.canRegister = updateGroupDto.canRegister ? 1 : 0;
    }
    if (!ObjectUtils.isNullOrUndefined(updateGroupDto.publicGroup)) {
      group.publicGroup = updateGroupDto.publicGroup ? 1 : 0;
    }
    group.updateTime = new Date();
    group.description = updateGroupDto.description;
    group.subject = updateGroupDto.subject;
    group.groupName = updateGroupDto.groupName;
    return group;
  }

  private entityToDto(group: Group): GroupDto {
    if (ObjectUtils.isNullOrUndefined(group)) {
      return null;
    }

    const dto = new GroupDto();
    dto.id = group.id;
    dto.canInvite = JSON.stringify(group.canInvite) === '1';
    dto.canRegister = JSON.stringify(group.canRegister) === '1';
    dto.createTime = group.createTime;
    dto.description = group.description;
    dto.groupName = group.groupName;
    dto.maxUser = group.maxUser;
    dto.publicGroup = JSON.stringify(group.publicGroup) === '1';
    dto.subject = group.subject;
    dto.updateTime = group.updateTime;
    return dto;
  }

  private groupPageToGroupPageDto(groupPage: Page<Group>): GroupPageDto {
    if (ObjectUtils.isNullOrUndefined(groupPage)) {
      return null;
    }
    const entities = groupPage.getEntities();
    const dtoEntities = lodash.map(entities, x => this.entityToDto(x));

    return new GroupPageDto(
      groupPage.getPageNum(),
      groupPage.getPageSize(),
      groupPage.getTotal(),
      groupPage.getPages(),
      dtoEntities,
    );
  }
}
