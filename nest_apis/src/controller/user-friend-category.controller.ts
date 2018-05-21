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
import { UserFriendCategoryService } from '../service';
import { LoggingInterceptor } from '../common/interceptors';
import { CreateUserDto, UpdateUserDto, CreateUserFriendDto, CreateUserFriendCategoryDto, UpdateUserFriendCategoryDto } from '../model/dto';

@Controller('userFriendCategory')
@ApiUseTags('userFriendCategory')
@UseInterceptors(LoggingInterceptor)
export class UserFriendCategoryController {
    constructor(
        private readonly userFriendCategoryService: UserFriendCategoryService) {
    }

    @Post()
    @ApiResponse({ status: 200, description: '返回插入的ID', type: 'integer' })
    public async create(@Body() createUserFriendCategoryDto: CreateUserFriendCategoryDto) {
        return await this.userFriendCategoryService.createUserFriendCategory(createUserFriendCategoryDto);
    }


    @Put(':userFriendCategoryId')
    @ApiImplicitParam({ name: 'userFriendCategoryId', type: 'integer' })
    async update(@Param('userFriendCategoryId', new ParseIntPipe()) userFriendCategoryId: number, @Body() dto: UpdateUserFriendCategoryDto) {
        return await this.userFriendCategoryService.updateUserFriendCategory(userFriendCategoryId, dto);
    }

    @Delete(':userFriendCategoryId')
    @ApiImplicitParam({ name: 'userFriendCategoryId', type: 'integer' })
    public async delete(@Param('userFriendCategoryId', new ParseIntPipe()) userFriendCategoryId: number) {
        return await this.userFriendCategoryService.deleteUserFriendCategory(userFriendCategoryId);
    }
}