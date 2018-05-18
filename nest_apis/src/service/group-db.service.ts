import { Component } from '@nestjs/common';
import { DbCoreService } from './db-core.service';
import { CreateGroupDto, UpdateGroupDto } from '../model/dto';
import { CommonHelper, IConnection } from 'tsbatis';
import { Group } from '../model/entity/table/group';
import { GroupMapper } from '../mapper/groupMapper';
import { DisplayException } from '../model/exception';

@Component()
export class GroupDbService {
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
            await conn.release();
            return new Promise<number>((resolve, reject) => resolve(group.id));
        } catch (error) {
            if (!CommonHelper.isNullOrUndefined(conn)) {
                if (beginTrans) {
                    await conn.rollback();
                }
                await conn.release();
            }
            return new Promise<number>((resolve, reject) => reject(error));
        }
    }

    public async updateGroup(groupId: number, updateGroupDto: UpdateGroupDto): Promise<void> {
        if (CommonHelper.isNullOrUndefined(groupId)) {
            return new Promise<void>((resolve, reject) => reject('"groupId" cannot be empty'));
        }
        if (CommonHelper.isNullOrUndefined(updateGroupDto)) {
            return new Promise<void>((resolve, reject) => resolve());
        }

        const group = this.updateDtoToEntity(groupId, updateGroupDto);
        try {
            const conn = await this.dbCoreService.getConnection();
            try {
                await conn.beginTransaction();
                const groupMapper = new GroupMapper(conn);
                const effectRows = await groupMapper.updateByPrimaryKeySelective(group);
                console.log('effectRows: ', effectRows);
                await conn.commit();
                await conn.release();
                return new Promise<void>((resolve, reject) => resolve());
            } catch (beginTransError) {
                await conn.release();
                return new Promise<void>((resolve, reject) => reject(beginTransError));
            }
        } catch (getConnError) {
            return new Promise<void>((resolve, reject) => reject(getConnError));
        }
    }

    private isDtoEmpty(dto: any): boolean {
        return CommonHelper.isNullOrUndefined(dto) || JSON.stringify(dto) === '{}';
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

    private updateDtoToEntity(groupId: number, updateGroupDto: UpdateGroupDto): Group {
        const group = new Group();
        group.id = groupId;
        if (!CommonHelper.isNullOrUndefined(updateGroupDto.canInvite)) {
            group.canInvite = updateGroupDto.canInvite ? 1 : 0;
        }
        if (!CommonHelper.isNullOrUndefined(updateGroupDto.canRegister)) {
            group.canRegister = updateGroupDto.canRegister ? 1 : 0;
        }
        if (!CommonHelper.isNullOrUndefined(updateGroupDto.publicGroup)) {
            group.publicGroup = updateGroupDto.publicGroup ? 1 : 0;
        }
        group.updateTime = new Date();
        group.description = updateGroupDto.description;
        group.subject = updateGroupDto.subject;
        group.groupName = updateGroupDto.groupName;
        return group;
    }
}