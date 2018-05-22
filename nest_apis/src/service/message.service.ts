import * as lodash from 'lodash';
import { Component } from '@nestjs/common';
import { DbCoreService } from './db-core.service';
import { CreatePrivateMessageDto, CreateGroupMessageDto } from '../model/dto';
import {
    CommonHelper,
    IConnection,
    Page,
    PageRowBounds,
    DynamicQuery,
    SortDescriptor,
    SortDirection,
    FilterDescriptor,
    FilterOperator,
} from 'tsbatis';
import { Group } from '../model/entity/table/group';
import { MessageMapper, PrivateMessageMapper, GroupMessageMapper } from '../mapper';
import { DisplayException } from '../model/exception';
import { Message } from '../model/entity/table/message';
import { ConversationType } from '../constant';
import { PrivateMessage } from '../model/entity/table/privateMessage';
import { GroupMessage } from '../model/entity/table/groupMessage';

@Component()
export class MessageService {
    constructor(private readonly dbCoreService: DbCoreService) {
        console.log('MessageService init');
    }

    public async createPrivateMessage(createMessageDto: CreatePrivateMessageDto): Promise<number> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (this.isDtoEmpty(createMessageDto)) {
                throw new DisplayException('参数不能为空');
            }
            const message = this.createPrivateDtoToMessage(createMessageDto);
            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const messageMapper = new MessageMapper(conn);
            const effectRows = await messageMapper.insertSelective(message);
            console.log('effectRows: ', effectRows);

            const privateMessageMapper = new PrivateMessageMapper(conn);
            const privateMessage1 = new PrivateMessage();
            privateMessage1.userId = createMessageDto.senderUserId;
            privateMessage1.friendUserId = createMessageDto.friendUserId;
            privateMessage1.messageId = message.id;
            privateMessage1.sendTime = new Date();
            const privateMessage2 = new PrivateMessage();
            privateMessage2.userId = createMessageDto.friendUserId;
            privateMessage2.friendUserId = createMessageDto.senderUserId;
            privateMessage2.messageId = message.id;
            privateMessage2.sendTime = new Date();
            // everyone save one copy.
            privateMessageMapper.insertSelective(privateMessage1);
            privateMessageMapper.insertSelective(privateMessage2);
            await conn.commit();
            return new Promise<number>((resolve, reject) => resolve(message.id));
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

    public async createGroupMessage(createMessageDto: CreateGroupMessageDto): Promise<number> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (this.isDtoEmpty(createMessageDto)) {
                throw new DisplayException('参数不能为空');
            }
            const message = this.createGroupDtoToMessage(createMessageDto);
            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const messageMapper = new MessageMapper(conn);
            const effectRows = await messageMapper.insertSelective(message);
            console.log('effectRows: ', effectRows);
            // only keep one copy.
            const groupMessageMapper = new GroupMessageMapper(conn);
            const groupMessage = new GroupMessage();
            groupMessage.groupId = createMessageDto.groupId;
            groupMessage.messageId = message.id;
            groupMessage.sendTime = new Date();
            await conn.commit();
            return new Promise<number>((resolve, reject) => resolve(message.id));
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

    private isDtoEmpty(dto: any): boolean {
        return CommonHelper.isNullOrUndefined(dto) || JSON.stringify(dto) === '{}';
    }

    private createPrivateDtoToMessage(dto: CreatePrivateMessageDto): Message {
        const entity = new Message();
        entity.content = dto.content;
        entity.conversationType = ConversationType.PRIVATE;
        entity.messageType = dto.messageType;
        entity.senderUserId = dto.senderUserId;
        entity.sendTime = new Date();
        entity.sourceUri = entity.sourceUri;
        return entity;
    }

    private createGroupDtoToMessage(dto: CreateGroupMessageDto): Message {
        const entity = new Message();
        entity.content = dto.content;
        entity.conversationType = ConversationType.GROUP;
        entity.messageType = dto.messageType;
        entity.senderUserId = dto.senderUserId;
        entity.sendTime = new Date();
        entity.sourceUri = entity.sourceUri;
        return entity;
    }
}