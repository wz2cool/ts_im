import { Get, Controller, Post, Body, Put, Request, Response, Param } from '@nestjs/common';
import { CreateGroupDto, UpdateGroupDto } from '../model/dto';
import { GroupDbService } from '../service';
import { ApiImplicitParam } from '@nestjs/swagger';

@Controller('groups')
export class GroupsController {
    constructor(private readonly groupDbService: GroupDbService) {
    }

    @Post()
    async create(@Body() dto: CreateGroupDto) {
        return await this.groupDbService.createGroup(dto);
    }

    @Put(':groupId')
    @ApiImplicitParam({ name: 'groupId', type: Number })
    async update(@Param() params: any, @Body() dto: UpdateGroupDto) {
        return await this.groupDbService.updateGroup(params.groupId, dto);
    }
}
