import { IsString, IsInt, IsBoolean, IsNumber, IsDate } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class GroupDto {
    @ApiModelProperty({ type: Number })
    @IsNumber()
    public id: number;

    @ApiModelProperty({ type: String })
    @IsString()
    public groupName: string;

    @ApiModelProperty({ type: String })
    @IsString()
    public displayName: string;

    @ApiModelProperty({ type: String })
    @IsString()
    public subject: string;

    @ApiModelProperty({ type: String })
    @IsString()
    public description: string;

    @ApiModelProperty({ type: Boolean })
    @IsBoolean()
    public canInvite: boolean;

    @ApiModelProperty({ type: Boolean })
    @IsBoolean()
    public canRegister: boolean;

    @ApiModelProperty({ type: Number })
    @IsNumber()
    public maxUser: number;

    @ApiModelProperty({ type: Boolean })
    @IsBoolean()
    public publicGroup: boolean;

    @ApiModelProperty({ type: 'string', format: 'date-time' })
    @IsDate()
    public createTime: Date;

    @ApiModelProperty({ type: 'string', format: 'date-time' })
    @IsDate()
    public updateTime: Date;
}