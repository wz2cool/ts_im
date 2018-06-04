import { IsString, IsInt, IsBoolean, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserFilterDto {
    @ApiModelProperty({ type: String, required: false })
    userName: string;

    @ApiModelProperty({ type: String, required: false })
    displayName: string;

    @ApiModelProperty({ type: String, required: false })
    email: string;

    @ApiModelProperty({ type: String, required: false })
    mobile: string;

    @ApiModelProperty({ type: 'integer', required: false })
    source: number;

    @ApiModelProperty({ type: 'integer', required: false })
    active: number;
}
