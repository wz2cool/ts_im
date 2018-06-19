import { Component, Injectable } from '@nestjs/common';
import { DbCoreService } from './db-core.service';
import { CreateRequestDto } from '../model/dto';
import { IConnection } from 'tsbatis';
import { Request } from '../model/entity/table/request';
import { DisplayException } from '../model/exception';
import { RequestMapper } from '../mapper';
import { RequestStatus } from '../constant';
import { ObjectUtils } from 'ts-commons';

@Injectable()
export class RequestService {
  constructor(private readonly dbCoreService: DbCoreService) {
    console.log('UserConversationService init');
  }

  public async create(dto: CreateRequestDto): Promise<number> {
    let conn: IConnection;
    let beginTrans: boolean = false;
    try {
      if (this.isDtoEmpty(dto)) {
        throw new DisplayException('参数不能为空');
      }
      const entity = this.createDtoToEntity(dto);
      conn = await this.dbCoreService.getConnection();
      await conn.beginTransaction();
      beginTrans = true;
      const mapper = new RequestMapper(conn);
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
      if (!ObjectUtils.isNullOrUndefined(conn)) {
        await conn.release();
      }
    }
  }

  public async approveRequest(id: number): Promise<void> {
    let conn: IConnection;
    let beginTrans: boolean = false;
    try {
      if (ObjectUtils.isNullOrUndefined(id)) {
        throw new DisplayException('"Id" 不能为空。');
      }
      const entity = new Request();
      entity.id = id;
      entity.status = RequestStatus.PROCESSING;
      entity.updateTime = new Date();
      conn = await this.dbCoreService.getConnection();
      await conn.beginTransaction();
      beginTrans = true;
      const mapper = new RequestMapper(conn);
      const effectRows = await mapper.updateByPrimaryKeySelective(entity);
      console.log('effectRows: ', effectRows);
      await conn.commit();

      // TODO: send approved to socketio.
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

  public async denyRequest(id: number): Promise<void> {
    let conn: IConnection;
    let beginTrans: boolean = false;
    try {
      if (ObjectUtils.isNullOrUndefined(id)) {
        throw new DisplayException('"Id" 不能为空。');
      }
      const entity = new Request();
      entity.id = id;
      entity.status = RequestStatus.DENIED;
      entity.updateTime = new Date();
      conn = await this.dbCoreService.getConnection();
      await conn.beginTransaction();
      beginTrans = true;
      const mapper = new RequestMapper(conn);
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
      if (!ObjectUtils.isNullOrUndefined(conn)) {
        await conn.release();
      }
    }
  }

  public async delete(id: number): Promise<void> {
    let conn: IConnection;
    let beginTrans: boolean = false;
    try {
      if (ObjectUtils.isNullOrUndefined(id)) {
        throw new DisplayException('"id" 不能为空。');
      }
      conn = await this.dbCoreService.getConnection();
      await conn.beginTransaction();
      beginTrans = true;
      const mapper = new RequestMapper(conn);
      const effectRows = await mapper.deleteByPrimaryKey(id);
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

  private createDtoToEntity(dto: CreateRequestDto): Request {
    const entity = new Request();
    entity.content = dto.content;
    entity.createTime = new Date();
    entity.matchId = dto.matchId;
    entity.remark = dto.remark;
    entity.requestType = dto.requestType;
    entity.requestUserId = dto.requestUserId;
    entity.status = RequestStatus.PROCESSING;
    return entity;
  }
}
