import { Get, Controller, Post, Body, Put, Request, Response, Param, Query, UseInterceptors, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { LoggingInterceptor } from '../common/interceptors';
import { UserDetailService } from '../service';
import { CreateUserDetailDto, UpdateUserDetailDto } from '../model/dto';

@Controller('userDetail')
@ApiUseTags('userDetail')
@UseInterceptors(LoggingInterceptor)
export class UserDetailController {
    constructor(
        private readonly userDetailService: UserDetailService) {
    }

    @Post()
    @ApiResponse({ status: 200, description: '返回插入的ID', type: 'integer' })
    public async create(@Body() createUserDto: CreateUserDetailDto) {
        return await this.userDetailService.createUserDetail(createUserDto);
    }

    @Put(':userDetailId')
    @ApiImplicitParam({ name: 'userDetailId', type: 'integer' })
    async update(@Param('userDetailId', new ParseIntPipe()) userDetailId: number, @Body() dto: UpdateUserDetailDto) {
        return await this.userDetailService.updateUserDetail(userDetailId, dto);
    }

    @Delete(':userDetailId')
    @ApiImplicitParam({ name: 'userDetailId', type: 'integer' })
    async delete(@Param('userDetailId', new ParseIntPipe()) userDetailId: number) {
        return await this.userDetailService.deleteUserDetail(userDetailId);
    }
}