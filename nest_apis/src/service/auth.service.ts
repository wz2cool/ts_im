import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../model/interface';
import { UserService } from './user.service';
import { JwtTokenDto, UserLoginInfoDto } from '../model/dto';
import { DisplayException } from '../model/exception';
import { RedisService } from './redis.service';
import { ObjectUtils } from 'ts-commons';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {}

  // identity can be username, email, mobile
  public async createToken(
    userLoginInfo: UserLoginInfoDto,
  ): Promise<JwtTokenDto> {
    try {
      const user = await this.userService.getUserBaseInfoByLoginInfo(
        userLoginInfo,
      );
      if (ObjectUtils.isNullOrUndefined(user)) {
        throw new DisplayException('未能找到匹配用户');
      }

      // only keep 3 days.
      const expiresIn = 3 * 24 * 60 * 60;
      await this.redisService.setWithExpire(
        this.generateUserIdLoginKey(user.id),
        JSON.stringify(user),
        expiresIn,
      );
      const jwtPayload: JwtPayload = { userId: user.id };
      const accessToken = jwt.sign(jwtPayload, 'ts_im_secretKey', {
        expiresIn,
      });
      const result = new JwtTokenDto();
      result.expiresIn = expiresIn;
      result.accessToken = accessToken;
      return new Promise<JwtTokenDto>((resolve, reject) => resolve(result));
    } catch (error) {
      return new Promise<JwtTokenDto>((resolve, reject) => reject(error));
    }
  }

  public async validateUser(payload: JwtPayload): Promise<string> {
    try {
      const userStr = await this.redisService.get(
        this.generateUserIdLoginKey(payload.userId),
      );
      return new Promise<string>(resolve => resolve(userStr));
    } catch (error) {
      return new Promise<string>((resolve, reject) => reject(error));
    }
  }

  private generateUserIdLoginKey(userId: number): string {
    return `userId_Login_${userId}`;
  }
}
