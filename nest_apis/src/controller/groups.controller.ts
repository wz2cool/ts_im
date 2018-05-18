import { Get, Controller, Post, Body, Put, Request, Response, Param } from '@nestjs/common';
import { CreateGroupDto, UpdateGroupDto, GroupPageDto } from '../model/dto';
import { GroupDbService } from '../service';
import { ApiImplicitParam, ApiResponse } from '@nestjs/swagger';

@Controller('groups')
export class GroupsController {
    constructor(private readonly groupDbService: GroupDbService) {
    }

    @Post()
    @ApiResponse({ status: 200, description: '返回插入的ID', type: 'Integer' })
    async create(@Body() dto: CreateGroupDto) {
        return await this.groupDbService.createGroup(dto);
    }

    @Put(':groupId')
    @ApiImplicitParam({ name: 'groupId', type: Number })
    async update(@Param() params: any, @Body() dto: UpdateGroupDto) {
        return await this.groupDbService.updateGroup(params.groupId, dto);
    }

    @Get()
    @ApiResponse({ status: 200, description: '获取全部组', type: GroupPageDto })
    async getGroups() {

    }
}
