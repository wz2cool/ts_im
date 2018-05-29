import { Get, Controller, Post, Body, Put, Delete, Request, Response, Param, Query, UseInterceptors } from '@nestjs/common';
import { CreateRequestDto } from '../model/dto';
import { RequestService } from '../service';
import { ApiImplicitParam, ApiResponse, ApiImplicitQuery, ApiUseTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '../common/interceptors';
import { ParseIntPipe } from '@nestjs/common';

@Controller('request')
@ApiUseTags('request')
@UseInterceptors(LoggingInterceptor)
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