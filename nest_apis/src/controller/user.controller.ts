import {
    Controller,
    UseInterceptors,
    Get,
    Post,
    Body,
    Put,
    Request,
    Response,
    Param,
    Query,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { UserService } from '../service';
import { LoggingInterceptor } from '../common/interceptors';
import { CreateUserDto, UpdateUserDto } from 'model/dto';

@Controller('user')
@ApiUseTags('user')
@UseInterceptors(LoggingInterceptor)
export class UserController {
    constructor(
        private readonly userService: UserService) {
    }

    @Post()
    @ApiResponse({ status: 200, description: '返回插入的ID', type: 'integer' })
    public async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }

    @Put(':userId')
    @ApiImplicitParam({ name: 'userId', type: 'integer' })
    async update(@Param('userId', new ParseIntPipe()) userId: number, @Body() dto: UpdateUserDto) {
        return await this.userService.updateUser(userId, dto);
    }

    @Delete(':userId')
    @ApiImplicitParam({ name: 'userId', type: 'integer' })
    async delete(@Param('userId', new ParseIntPipe()) userId: number) {
        return await this.userService.deleteUser(userId);
    }
}