import { UnauthorizedException } from '@nestjs/common';
import { AuthGuardOptions } from '@nestjs/passport/dist/options';

export const jwtAuthOptions: AuthGuardOptions = {
    session: false,
    property: 'user',
    callback: (err, user, info) => {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    },
};