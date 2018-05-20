import { Get, Controller, Post, Body, Put, Request, Response, Param, Query, UseInterceptors } from '@nestjs/common';
import { CreateGroupDto, UpdateGroupDto, GroupPageDto } from '../model/dto';
import { GroupService } from '../service';
import { ApiImplicitParam, ApiResponse, ApiImplicitQuery } from '@nestjs/swagger';
import { LoggingInterceptor } from '../common/interceptors';
import { ParseIntPipe } from '@nestjs/common';

@Controller('groups')
@UseInterceptors(LoggingInterceptor)
export class GroupsController {
    constructor(private readonly groupDbService: GroupService) {
    }

    @Post()
    @ApiResponse({ status: 200, description: '返回插入的ID', type: 'integer' })
    async create(@Body() dto: CreateGroupDto) {
        return await this.groupDbService.createGroup(dto);
    }

    @Put(':groupId')
    @ApiImplicitParam({ name: 'groupId', type: 'integer' })
    async update(
        @Param('groupId', new ParseIntPipe()) groupId: number,
        @Body() dto: UpdateGroupDto) {
        return await this.groupDbService.updateGroup(groupId, dto);
    }

    @Get()
    @ApiImplicitQuery({ name: 'pageNum', type: 'integer' })
    @ApiImplicitQuery({ name: 'pageSize', type: 'integer' })
    @ApiResponse({ status: 200, description: '分页获取全部组', type: GroupPageDto })
    async getGroups(
        @Query('pageNum', new ParseIntPipe()) pageNum: number,
        @Query('pageSize', new ParseIntPipe()) pageSize: number) {
        return await this.groupDbService.getGroups(pageNum, pageSize);
    }

    @Get(':groupId')
    @ApiImplicitParam({ name: 'groupId', type: 'integer' })
    async getGroupById(@Param('groupId', new ParseIntPipe()) groupId: number) {
        return await this.groupDbService.getGroupById(groupId);
    }
}
