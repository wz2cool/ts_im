import * as jwt from 'jsonwebtoken';
import { Component, Injectable } from '@nestjs/common';
import { JwtPayload } from '../model/interface';
import { UserService } from './user.service';
import { JwtTokenDto, UserLoginInfoDto } from '../model/dto';
import { CommonHelper } from 'tsbatis';
import { DisplayException } from '../model/exception';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {
    }

    // identity can be username, email, mobile
    public async createToken(userLoginInfo: UserLoginInfoDto): Promise<JwtTokenDto> {
        try {
            const user = await this.userService.getUserByLoginInfo(userLoginInfo);
            if (CommonHelper.isNullOrUndefined(user)) {
                throw new DisplayException('未能找到匹配用户');
            }
            const jwtPayload: JwtPayload = { userId: user.id };
            const expiresIn = 3600;
            const accessToken = jwt.sign(jwtPayload, 'ts_im_secretKey', { expiresIn });
            const result = new JwtTokenDto();
            result.expiresIn = expiresIn;
            result.accessToken = accessToken;
            return new Promise<JwtTokenDto>((resolve, reject) => resolve(result));
        } catch (error) {
            return new Promise<JwtTokenDto>((resolve, reject) => reject(error));
        }
    }

    public async validateUser(payload: JwtPayload): Promise<any> {
        // put some validation logic here
        // for example query user by id/email/username
        return {};
    }
}