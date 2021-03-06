import { Get, Controller, Post, Body, Put, Request, Response, Param, Query, UseInterceptors, Delete, UseGuards } from '@nestjs/common';
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
import { ApiImplicitParam, ApiResponse, ApiImplicitQuery, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { ParseIntPipe } from '@nestjs/common';
import { LoggingInterceptor } from '../common/interceptors';
import { jwtAuthOptions } from '../jwt';
import { AuthGuard } from '@nestjs/passport';

@Controller('userGroup')
@ApiUseTags('userGroup')
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt', jwtAuthOptions))
export class UserGroupController {
    constructor(
        private readonly userGroupService: UserGroupService) {
    }

    @Post()
    @ApiResponse({ status: 200, description: '返回插入的ID', type: 'integer' })
    async create(@Body() dto: CreateUserGroupDto) {
        return await this.userGroupService.createUserGroup(dto);
    }

    @Put(':id')
    @ApiImplicitParam({ name: 'id', type: 'integer' })
    async update(@Param('id', new ParseIntPipe()) id: number, @Body() dto: UpdateUserGroupDto) {
        return await this.userGroupService.updateUserGroup(id, dto);
    }

    @Delete(':id')
    @ApiImplicitParam({ name: 'id', type: 'integer' })
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        return await this.userGroupService.deleteUserGroup(id);
    }
}