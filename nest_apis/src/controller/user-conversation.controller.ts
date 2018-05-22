import { Get, Controller, Post, Body, Put, Delete, Request, Response, Param, Query, UseInterceptors } from '@nestjs/common';
import { CreateUserConversationDto, UpdateUserConversationDto } from '../model/dto';
import { UserConversationService } from '../service';
import { ApiImplicitParam, ApiResponse, ApiImplicitQuery, ApiUseTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '../common/interceptors';
import { ParseIntPipe } from '@nestjs/common';

@Controller('userConversation')
@ApiUseTags('userConversation')
@UseInterceptors(LoggingInterceptor)
export class UserConversationController {
    constructor(private readonly userConversationService: UserConversationService) {
    }

    @Post()
    @ApiResponse({ status: 200, description: '返回插入的ID', type: 'integer' })
    async create(@Body() dto: CreateUserConversationDto) {
        return await this.userConversationService.create(dto);
    }

    @Put(':userConverationId')
    @ApiImplicitParam({ name: 'userConverationId', type: 'integer' })
    async update(@Param('userConverationId', new ParseIntPipe()) userConverationId: number, @Body() dto: UpdateUserConversationDto) {
        return await this.userConversationService.update(userConverationId, dto);
    }

    @Delete(':userConverationId')
    @ApiImplicitParam({ name: 'userConverationId', type: 'integer' })
    async delete(@Param('userConverationId', new ParseIntPipe()) userGroupId: number) {
        return await this.userConversationService.delete(userGroupId);
    }
}