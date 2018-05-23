import { IsString, IsInt, IsBoolean, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserFriendCategoryDto {
    @ApiModelProperty({ type: 'integer', required: false })
    @IsString()
    id: number;

    @ApiModelProperty({ type: String, required: false })
    @IsString()
    categoryName: string;

    @ApiModelProperty({ type: 'integer', required: false })
    @IsString()
    categoryIndex: number;
}