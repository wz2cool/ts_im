import { IsString, IsInt, IsBoolean, IsNumber, IsDate } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class JwtTokenDto {
    @ApiModelProperty({ type: 'integer' })
    public expiresIn: number;

    @ApiModelProperty({ type: 'string' })
    public accessToken: string;
}