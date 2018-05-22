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

    @Put(':id')
    @ApiImplicitParam({ name: 'id', type: 'integer' })
    async update(@Param('id', new ParseIntPipe()) id: number, @Body() dto: UpdateUserFriendCategoryDto) {
        return await this.userFriendCategoryService.updateUserFriendCategory(id, dto);
    }

    @Delete(':id')
    @ApiImplicitParam({ name: 'id', type: 'integer' })
    public async delete(@Param('id', new ParseIntPipe()) id: number) {
        return await this.userFriendCategoryService.deleteUserFriendCategory(id);
    }
}