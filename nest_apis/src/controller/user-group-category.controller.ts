import { Get, Controller, Post, Body, Put, Request, Response, Param, Query, UseInterceptors } from '@nestjs/common';
import { CreateGroupDto, UpdateGroupDto, GroupPageDto, CreateUserGroupCategoryDto } from '../model/dto';
import { GroupService } from '../service';
import { ApiImplicitParam, ApiResponse, ApiImplicitQuery } from '@nestjs/swagger';
import { LoggingInterceptor } from '../common/interceptors';
import { ParseIntPipe } from '@nestjs/common';
import { UserGroupCategoryService } from 'service/user-group-category.service';

@Controller('userGroupCategory')
@UseInterceptors(LoggingInterceptor)
export class UserGroupCategoryController {
    constructor(private readonly userGroupCategoryService: UserGroupCategoryService) {
    }

    @Post()
    @ApiResponse({ status: 200, description: '返回插入的ID', type: 'integer' })
    async create(@Body() dto: CreateUserGroupCategoryDto) {
        return await this.userGroupCategoryService.createUserGroupCategory(dto);
    }
}