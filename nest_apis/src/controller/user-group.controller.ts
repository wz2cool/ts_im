import { Get, Controller, Post, Body, Put, Request, Response, Param, Query, UseInterceptors, Delete } from '@nestjs/common';
import {
    CreateGroupDto,
    UpdateGroupDto,
    GroupPageDto,
    CreateUserGroupCategoryDto,
    GroupDto,
    CreateUserGroupDto,
    UpdateUserGroupDto,
} from '../model/dto';
import { GroupService, UserGroupCategoryService, UserGroupService } from '../service';
import { ApiImplicitParam, ApiResponse, ApiImplicitQuery, ApiUseTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '../common/interceptors';
import { ParseIntPipe } from '@nestjs/common';

@Controller('userGroup')
@ApiUseTags('userGroup')
@UseInterceptors(LoggingInterceptor)
export class UserGroupController {
    constructor(
        private readonly userGroupService: UserGroupService) {
    }

    @Post()
    @ApiResponse({ status: 200, description: '返回插入的ID', type: 'integer' })
    async create(@Body() dto: CreateUserGroupDto) {
        return await this.userGroupService.createUserGroup(dto);
    }

    @Put(':userGroupId')
    @ApiImplicitParam({ name: 'userGroupId', type: 'integer' })
    async update(@Param('userGroupId', new ParseIntPipe()) userGroupId: number, @Body() dto: UpdateUserGroupDto) {
        return await this.userGroupService.updateUserGroup(userGroupId, dto);
    }

    @Delete(':userGroupId')
    @ApiImplicitParam({ name: 'userGroupId', type: 'integer' })
    async delete(@Param('userGroupId', new ParseIntPipe()) userGroupId: number) {
        return await this.userGroupService.deleteUserGroup(userGroupId);
    }
}