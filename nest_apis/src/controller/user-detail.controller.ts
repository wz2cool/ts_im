import { Get, Controller, Post, Body, Put, Request, Response, Param, Query, UseInterceptors, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiImplicitParam, ApiBearerAuth } from '@nestjs/swagger';
import { UserDetailService } from '../service';
import { CreateUserDetailDto, UpdateUserDetailDto } from '../model/dto';
import { LoggingInterceptor } from '../common/interceptors';
import { AuthGuard } from '@nestjs/passport';
import { jwtAuthOptions } from '../jwt';

@Controller('userDetail')
@ApiUseTags('userDetail')
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt', jwtAuthOptions))
export class UserDetailController {
    constructor(
        private readonly userDetailService: UserDetailService) {
    }

    @Post()
    @ApiResponse({ status: 200, description: '返回插入的ID', type: 'integer' })
    public async create(@Body() createUserDto: CreateUserDetailDto) {
        return await this.userDetailService.createUserDetail(createUserDto);
    }

    @Put(':id')
    @ApiImplicitParam({ name: 'id', type: 'integer' })
    async update(@Param('id', new ParseIntPipe()) id: number, @Body() dto: UpdateUserDetailDto) {
        return await this.userDetailService.updateUserDetail(id, dto);
    }

    @Delete(':id')
    @ApiImplicitParam({ name: 'id', type: 'integer' })
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        return await this.userDetailService.deleteUserDetail(id);
    }
}