import { Component } from '@nestjs/common';
import { DbCoreService } from './db-core.service';
import { CreateUserConversationDto, UpdateUserConversationDto } from 'model/dto';
import { IConnection, CommonHelper } from 'tsbatis';
import { UserConversation } from '../model/entity/table/userConversation';
import { DisplayException } from '../model/exception';
import { UserConversationMapper } from '../mapper';

@Component()
export class UserConversationService {
    constructor(private readonly dbCoreService: DbCoreService) {
        console.log('UserConversationService init');
    }

    public async create(dto: CreateUserConversationDto): Promise<number> {
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
            const mapper = new UserConversationMapper(conn);
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

    public async update(id: number, dto: UpdateUserConversationDto): Promise<void> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (CommonHelper.isNullOrUndefined(id)) {
                throw new DisplayException('"Id" 不能为空。');
            }
            if (this.isDtoEmpty(dto)) {
                throw new DisplayException('参数不能为空。');
            }
            const entity = this.updateDtoToEntity(id, dto);
            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const mapper = new UserConversationMapper(conn);
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
                await conn.release();
            }
        }
    }

    public async delete(id: number): Promise<void> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (CommonHelper.isNullOrUndefined(id)) {
                throw new DisplayException('"id" 不能为空。');
            }

            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const mapper = new UserConversationMapper(conn);
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
            if (!CommonHelper.isNullOrUndefined(conn)) {
                await conn.release();
            }
        }
    }

    private isDtoEmpty(dto: any): boolean {
        return CommonHelper.isNullOrUndefined(dto) || JSON.stringify(dto) === '{}';
    }

    private createDtoToEntity(dto: CreateUserConversationDto): UserConversation {
        const entity = new UserConversation();
        entity.conversationType = dto.conversationType;
        entity.createTime = new Date();
        entity.matchId = dto.matchId;
        entity.title = dto.title;
        entity.updateTime = new Date();
        entity.userId = dto.userId;
        return entity;
    }

    private updateDtoToEntity(userConversationId: number, dto: UpdateUserConversationDto): UserConversation {
        const entity = new UserConversation();
        entity.id = userConversationId;
        // only can change title;
        entity.title = dto.title;
        entity.updateTime = new Date();
        return entity;
    }
}