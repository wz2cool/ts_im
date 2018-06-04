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
    UseGuards,
} from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiImplicitParam, ApiBearerAuth, ApiImplicitQuery } from '@nestjs/swagger';
import { UserService, UserFriendCategoryService } from '../service';
import { CreateUserDto, UpdateUserDto, UserFriendCategoryDto, UserFilterDto, UserInfoPageDto } from '../model/dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggingInterceptor } from '../common/interceptors';
import { jwtAuthOptions } from '../jwt';

@Controller('users')
@ApiUseTags('users')
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt', jwtAuthOptions))
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

    @Post('paging')
    @ApiImplicitQuery({ name: 'pageNum', type: 'integer' })
    @ApiImplicitQuery({ name: 'pageSize', type: 'integer' })
    @ApiResponse({ status: 201, description: '返回分页的用户信息', type: UserInfoPageDto })
    async getUserPagingByFilter(
        @Body() userFilterDto: UserFilterDto,
        @Query('pageNum') pageNum: number,
        @Query('pageSize') pageSize: number) {
        return await this.userService.getUserInfoPagingByFilter(userFilterDto, pageNum, pageSize);
    }
}