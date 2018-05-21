import { Get, Controller, Post, Body, Put, Request, Response, Param, Query, UseInterceptors, Delete } from '@nestjs/common';
import { CreateGroupDto, UpdateGroupDto, GroupPageDto, CreateUserGroupCategoryDto, GroupDto, UpdateUserGroupCategoryDto } from '../model/dto';
import { GroupService, UserGroupCategoryService, UserGroupService } from '../service';
import { ApiImplicitParam, ApiResponse, ApiImplicitQuery, ApiUseTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '../common/interceptors';
import { ParseIntPipe } from '@nestjs/common';

@Controller('userGroupCategory')
@ApiUseTags('userGroupCategory')
@UseInterceptors(LoggingInterceptor)
export class UserGroupCategoryController {
    constructor(
        private readonly userGroupCategoryService: UserGroupCategoryService,
        private readonly userGroupService: UserGroupService) {
    }

    @Post()
    @ApiResponse({ status: 200, description: '返回插入的ID', type: 'integer' })
    async create(@Body() dto: CreateUserGroupCategoryDto) {
        return await this.userGroupCategoryService.createUserGroupCategory(dto);
    }

    @Put(':userGroupCategoryId')
    @ApiImplicitParam({ name: 'userGroupCategoryId', type: 'integer' })
    async update(@Param('userGroupCategoryId', new ParseIntPipe()) categoryId: number, dto: UpdateUserGroupCategoryDto) {
        return await this.userGroupCategoryService.updateUserGroupCategory(categoryId, dto);
    }

    @Delete(':userGroupCategoryId')
    @ApiImplicitParam({ name: 'userGroupCategoryId', type: 'integer' })
    async delete(@Param('userGroupCategoryId', new ParseIntPipe()) categoryId: number) {
        return await this.userGroupCategoryService.deleteUserGroupCategory(categoryId);
    }

    @Get(':userGroupCategoryId/groups')
    @ApiImplicitParam({ name: 'userGroupCategoryId', type: 'integer' })
    @ApiResponse({ status: 200, description: '分类下的组', type: GroupDto, isArray: true })
    async getGroupsByUserCategoryId(@Param('userGroupCategoryId', new ParseIntPipe()) categoryId: number) {
        return await this.userGroupService.getGroupsByUserCategoryId(categoryId);
    }
}