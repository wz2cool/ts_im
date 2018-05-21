import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateUserDetailDto {
    @ApiModelProperty({ type: 'integer' })
    @IsNumber()
    readonly userId: number;

    @ApiModelProperty({ type: 'integer', readOnly: false })
    @IsNumber()
    readonly age: number;

    @ApiModelProperty({ type: 'integer', readOnly: false })
    @IsNumber()
    readonly sex: number;

    @ApiModelProperty({ type: String, readOnly: false })
    @IsString()
    readonly province: string;

    @ApiModelProperty({ type: String, readOnly: false })
    @IsString()
    readonly city: string;

    @ApiModelProperty({ type: String, readOnly: false })
    @IsString()
    readonly qq: string;

    @ApiModelProperty({ type: String, readOnly: false })
    @IsString()
    readonly wechat: string;
}