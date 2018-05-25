import { IsString, IsInt, IsBoolean, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserBaseInfoDto {
    @ApiModelProperty({ type: 'integer', required: false })
    @IsNumber()
    id: number;

    @ApiModelProperty({ type: String, required: false })
    @IsString()
    userName: string;

    @ApiModelProperty({ type: String, required: false })
    @IsString()
    displayName: string;

    @ApiModelProperty({ type: String, required: false })
    @IsString()
    imageUrl: string;
}
