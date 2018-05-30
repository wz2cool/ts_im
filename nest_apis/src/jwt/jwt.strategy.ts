import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../service';
import { Component, UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtPayload } from '../model/interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'ts_im_secretKey',
        });
    }

    async validate(payload: JwtPayload, done: (ex: UnauthorizedException, payload: any) => void) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            return done(new UnauthorizedException(), false);
        }
        done(null, user);
    }
}