import { Get, Controller, Post, Body, Put, Request, Response, Param, Query, UseInterceptors, UseGuards } from '@nestjs/common';
import { CreateGroupDto, UpdateGroupDto, GroupPageDto } from '../model/dto';
import { GroupService } from '../service';
import { ApiImplicitParam, ApiResponse, ApiImplicitQuery, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { ParseIntPipe } from '@nestjs/common';
import { LoggingInterceptor } from '../common/interceptors';
import { AuthGuard } from '@nestjs/passport';
import { jwtAuthOptions } from '../jwt';

@Controller('groups')
@ApiUseTags('groups')
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt', jwtAuthOptions))
export class GroupsController {
    constructor(private readonly groupDbService: GroupService) {
    }

    @Post()
    @ApiResponse({ status: 201, description: '返回插入的ID', type: 'integer' })
    async create(@Body() dto: CreateGroupDto) {
        return await this.groupDbService.createGroup(dto);
    }

    @Put(':id')
    @ApiImplicitParam({ name: 'id', type: 'integer' })
    async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: UpdateGroupDto) {
        return await this.groupDbService.updateGroup(id, dto);
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

    @Get(':id')
    @ApiImplicitParam({ name: 'id', type: 'integer' })
    async getGroupById(@Param('id', new ParseIntPipe()) id: number) {
        return await this.groupDbService.getGroupById(id);
    }
}
