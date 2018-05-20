import { IsString, IsInt, IsBoolean, IsNumber, IsDate } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserGroupDto {
    @ApiModelProperty({ type: Number })
    @IsNumber()
    public id: number;

    @ApiModelProperty({ type: Number })
    @IsNumber()
    public groupId: number;

    @ApiModelProperty({ type: String })
    @IsString()
    public groupName: string;

    @ApiModelProperty({ type: String })
    @IsString()
    public displayName: string;

    @ApiModelProperty({ type: 'integer' })
    @IsString()
    public userGroupCategoryId: number;

    @ApiModelProperty({ type: 'integer' })
    @IsString()
    public userId: number;

    @ApiModelProperty({ type: 'string', format: 'date-time' })
    @IsDate()
    public createTime: Date;

    @ApiModelProperty({ type: 'string', format: 'date-time' })
    @IsDate()
    public updateTime: Date;
}