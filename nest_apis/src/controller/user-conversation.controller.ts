import { Get, Controller, Post, Body, Put, Delete, Request, Response, Param, Query, UseInterceptors, UseGuards } from '@nestjs/common';
import { CreateUserConversationDto, UpdateUserConversationDto } from '../model/dto';
import { UserConversationService } from '../service';
import { ApiImplicitParam, ApiResponse, ApiImplicitQuery, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { ParseIntPipe } from '@nestjs/common';
import { LoggingInterceptor } from '../common/interceptors';
import { AuthGuard } from '@nestjs/passport';
import { jwtAuthOptions } from '../jwt';

@Controller('userConversation')
@ApiUseTags('userConversation')
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt', jwtAuthOptions))
export class UserConversationController {
    constructor(private readonly userConversationService: UserConversationService) {
    }

    @Post()
    @ApiResponse({ status: 200, description: '返回插入的ID', type: 'integer' })
    async create(@Body() dto: CreateUserConversationDto) {
        return await this.userConversationService.create(dto);
    }

    @Put(':id')
    @ApiImplicitParam({ name: 'id', type: 'integer' })
    async update(@Param('id', new ParseIntPipe()) id: number, @Body() dto: UpdateUserConversationDto) {
        return await this.userConversationService.update(id, dto);
    }

    @Delete(':id')
    @ApiImplicitParam({ name: 'id', type: 'integer' })
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        return await this.userConversationService.delete(id);
    }
}