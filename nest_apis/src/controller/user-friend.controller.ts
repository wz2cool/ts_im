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
import { LoggingInterceptor } from '../common/interceptors';
import { CreateUserDto, UpdateUserDto, CreateUserFriendDto } from '../model/dto';

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

    @Delete(':userFriendId')
    @ApiImplicitParam({ name: 'userFriendId', type: 'integer' })
    public async deleteUserFriend(@Param('userFriendId', new ParseIntPipe()) userFriendId: number) {
        return await this.userFriendService.deleteUserFriend(userFriendId);
    }
}