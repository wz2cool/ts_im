import { Controller, Get, UseGuards, Post, Body, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import { UserLoginInfoDto, JwtTokenDto } from '../model/dto';
import { ApiImplicitParam, ApiResponse, ApiImplicitQuery, ApiUseTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '../common/interceptors';

@ApiUseTags('auth')
@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }
    @Post('token')
    @ApiResponse({ status: 201, description: 'token 信息', type: JwtTokenDto })
    async createToken(@Body() userLoginInfo: UserLoginInfoDto) {
        return await this.authService.createToken(userLoginInfo);
    }
}