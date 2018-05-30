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
import { UserService, UserFriendService } from '../service';
import { CreateUserDto, UpdateUserDto, CreateUserFriendDto } from '../model/dto';
import { LoggingInterceptor } from '../common/interceptors';

@Controller('userFriend')
@ApiUseTags('userFriend')
@UseInterceptors(LoggingInterceptor)
export class UserFriendController {
    constructor(
        private readonly userFriendService: UserFriendService) {
    }

    @Post()
    @ApiResponse({ status: 200, description: '返回插入的ID', type: 'integer' })
    public async createUserFriend(@Body() createUserFriendDto: CreateUserFriendDto) {
        return await this.userFriendService.createUserFriend(createUserFriendDto);
    }

    @Delete(':id')
    @ApiImplicitParam({ name: 'id', type: 'integer' })
    public async deleteUserFriend(@Param('id', new ParseIntPipe()) id: number) {
        return await this.userFriendService.deleteUserFriend(id);
    }
}