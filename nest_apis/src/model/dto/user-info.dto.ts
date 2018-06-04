import { IsString, IsInt, IsBoolean, IsNumber, IsDate } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserInfoDto {
    @ApiModelProperty({ type: 'integer' })
    public id: number;

    @ApiModelProperty({ type: String })
    public userName: string;

    @ApiModelProperty({ type: String })
    public email: string;

    @ApiModelProperty({ type: String })
    public mobile: string;

    @ApiModelProperty({ type: 'integer' })
    public source: number;

    @ApiModelProperty({ type: String })
    public displayName: string;

    @ApiModelProperty({ type: String })
    public imageUrl: string;

    @ApiModelProperty({ type: 'integer' })
    public active: number;

    @ApiModelProperty({ type: 'integer' })
    public createTime: number;

    @ApiModelProperty({ type: 'integer' })
    public updateTime: number;
}