import { Get, Controller, Post, Body, Put, Delete, Request, Response, Param, Query, UseInterceptors, UseGuards } from '@nestjs/common';
import { CreateRequestDto } from '../model/dto';
import { RequestService } from '../service';
import { ApiImplicitParam, ApiResponse, ApiImplicitQuery, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { ParseIntPipe } from '@nestjs/common';
import { LoggingInterceptor } from '../common/interceptors';
import { AuthGuard } from '@nestjs/passport';
import { jwtAuthOptions } from '../jwt';

@Controller('request')
@ApiUseTags('request')
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt', jwtAuthOptions))
export class RequestController {
    constructor(private readonly requestService: RequestService) {
    }

    @Post()
    @ApiResponse({ status: 200, description: '返回插入的ID', type: 'integer' })
    async create(@Body() dto: CreateRequestDto) {
        return await this.requestService.create(dto);
    }

    @Put(':id/approve')
    @ApiImplicitParam({ name: 'id', type: 'integer' })
    async approveRequest(@Param('id', new ParseIntPipe()) id: number) {
        return await this.requestService.approveRequest(id);
    }

    @Put(':id/deny')
    @ApiImplicitParam({ name: 'id', type: 'integer' })
    async denyRequest(@Param('id', new ParseIntPipe()) id: number) {
        return await this.requestService.denyRequest(id);
    }

    @Delete(':id')
    @ApiImplicitParam({ name: 'id', type: 'integer' })
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        return await this.requestService.delete(id);
    }
}