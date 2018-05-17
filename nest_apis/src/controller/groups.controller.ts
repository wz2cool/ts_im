import { Get, Controller, Post, Body, Request, Response } from '@nestjs/common';
import { CreateGroupDto } from '../model/dto';
import { GroupDbService } from '../service';

@Controller('groups')
export class GroupsController {
    constructor(private readonly groupDbService: GroupDbService) {
    }

    @Post()
    async create(@Body() dto: CreateGroupDto) {
        return await this.groupDbService.createGroup(dto);
    }
}
