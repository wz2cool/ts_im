import { IsString, IsInt, IsBoolean, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiModelProperty({ type: String, required: false })
    @IsString()
    readonly email: string;

    @ApiModelProperty({ type: String, required: false })
    @IsString()
    readonly mobile: string;

    @ApiModelProperty({ type: String, required: false })
    @IsString()
    readonly password: string;

    @ApiModelProperty({ type: String, required: false })
    @IsString()
    readonly displayName: string;
}