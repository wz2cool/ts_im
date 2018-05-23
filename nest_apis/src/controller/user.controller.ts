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
import { UserService, UserFriendCategoryService } from '../service';
import { LoggingInterceptor } from '../common/interceptors';
import { CreateUserDto, UpdateUserDto, UserFriendCategoryDto } from '../model/dto';

@Controller('users')
@ApiUseTags('users')
@UseInterceptors(LoggingInterceptor)
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly userFriendCategoryService: UserFriendCategoryService) {
    }

    @Post()
    @ApiResponse({ status: 200, description: '返回插入的ID', type: 'integer' })
    public async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }

    @Put(':id')
    @ApiImplicitParam({ name: 'id', type: 'integer' })
    async update(@Param('id', new ParseIntPipe()) id: number, @Body() dto: UpdateUserDto) {
        return await this.userService.updateUser(id, dto);
    }

    @Delete(':id')
    @ApiImplicitParam({ name: 'id', type: 'integer' })
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        return await this.userService.deleteUser(id);
    }

    @Get(':id/userFriendCategories')
    @ApiImplicitParam({ name: 'id', type: 'integer' })
    @ApiResponse({ status: 200, isArray: true, type: UserFriendCategoryDto })
    async getUserFriendCategoriesByUserId(@Param('id', new ParseIntPipe()) id: number) {
        return await this.userFriendCategoryService.getUserFriendCategoriesByUserId(id);
    }
}