import { Get, Controller, Post, Body, Put, Request, Response, Param, Query, UseInterceptors } from '@nestjs/common';
import { CreateGroupDto, UpdateGroupDto, GroupPageDto } from '../model/dto';
import { GroupDbService } from '../service';
import { ApiImplicitParam, ApiResponse, ApiImplicitQuery } from '@nestjs/swagger';
import { LoggingInterceptor } from '../common/interceptor';

@Controller('groups')
@UseInterceptors(LoggingInterceptor)
export class GroupsController {
    constructor(private readonly groupDbService: GroupDbService) {
    }

    @Post()
    @ApiResponse({ status: 200, description: '返回插入的ID', type: 'integer' })
    async create(@Body() dto: CreateGroupDto) {
        return await this.groupDbService.createGroup(dto);
    }

    @Put(':groupId')
    @ApiImplicitParam({ name: 'groupId', type: 'integer' })
    async update(@Param() params: any, @Body() dto: UpdateGroupDto) {
        return await this.groupDbService.updateGroup(params.groupId, dto);
    }

    @Get()
    @ApiImplicitQuery({ name: 'pageNum', type: 'integer' })
    @ApiImplicitQuery({ name: 'pageSize', type: 'integer' })
    @ApiResponse({ status: 200, description: '分页获取全部组', type: GroupPageDto })
    async getGroups(@Query() query: any) {
        console.log(query);
    }

    @Get(':groupId')
    @ApiImplicitParam({ name: 'groupId', type: 'integer' })
    async getGroupById(@Param() params: any) {
        console.log(params);
    }
}
