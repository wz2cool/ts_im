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

    @Put(':id')
    @ApiImplicitParam({ name: 'id', type: 'integer' })
    async update(@Param('id', new ParseIntPipe()) id: number, dto: UpdateUserGroupCategoryDto) {
        return await this.userGroupCategoryService.updateUserGroupCategory(id, dto);
    }

    @Delete(':id')
    @ApiImplicitParam({ name: 'id', type: 'integer' })
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        return await this.userGroupCategoryService.deleteUserGroupCategory(id);
    }

    @Get(':id/groups')
    @ApiImplicitParam({ name: 'id', type: 'integer' })
    @ApiResponse({ status: 200, description: '分类下的组', type: GroupDto, isArray: true })
    async getGroupsByUserCategoryId(@Param('id', new ParseIntPipe()) id: number) {
        return await this.userGroupService.getGroupsByUserCategoryId(id);
    }
}