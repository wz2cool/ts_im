import { Get, Controller, Post, Body, Request, Response } from '@nestjs/common';
import { CreateGroupDto } from '../model/dto';

@Controller('groups')
export class GroupsController {
    @Post()
    create(@Body() dto: CreateGroupDto) {
        return 'this action adds a new cat';
    }
}
