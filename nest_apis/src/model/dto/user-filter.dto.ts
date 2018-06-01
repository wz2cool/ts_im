import { IsString, IsInt, IsBoolean, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserFilterDto {
    @ApiModelProperty({ type: String, required: false })
    @IsString()
    userName: string;

    @ApiModelProperty({ type: String, required: false })
    @IsString()
    displayName: string;

    @ApiModelProperty({ type: String, required: false })
    @IsString()
    email: string;

    @ApiModelProperty({ type: String, required: false })
    @IsString()
    mobile: string;

    @ApiModelProperty({ type: 'integer', required: false })
    @IsNumber()
    source: number;

    @ApiModelProperty({ type: 'integer', required: false })
    @IsNumber()
    active: number;
}
