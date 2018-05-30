import { Get, Controller, Post, Body, Put, Delete, Request, Response, Param, Query, UseInterceptors } from '@nestjs/common';
import { CreateRequestDto, CreatePrivateMessageDto, CreateGroupDto, CreateGroupMessageDto } from '../model/dto';
import { MessageService } from '../service';
import { ApiImplicitParam, ApiResponse, ApiImplicitQuery, ApiUseTags } from '@nestjs/swagger';
import { ParseIntPipe } from '@nestjs/common';

@Controller('message')
@ApiUseTags('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {
    }

    @Post('private')
    @ApiResponse({ status: 200, description: '返回插入的ID', type: 'integer' })
    async createPrivateMessage(@Body() dto: CreatePrivateMessageDto) {
        return await this.messageService.createPrivateMessage(dto);
    }

    @Post('group')
    @ApiResponse({ status: 200, description: '返回插入的ID', type: 'integer' })
    async createGroupMessage(@Body() dto: CreateGroupMessageDto) {
        return await this.messageService.createGroupMessage(dto);
    }
}