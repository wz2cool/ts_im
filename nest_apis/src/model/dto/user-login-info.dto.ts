import { IsString, IsInt, IsBoolean, IsNumber, IsDate } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserLoginInfoDto {
    @ApiModelProperty({ type: String })
    @IsString()
    public identity: string;

    @ApiModelProperty({ type: String })
    @IsString()
    public password: string;
}