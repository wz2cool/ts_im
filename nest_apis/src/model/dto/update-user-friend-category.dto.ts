import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class UpdateUserFriendCategoryDto {
    @ApiModelProperty({ type: String, required: false })
    @IsString()
    readonly categoryName: string;

    @ApiModelProperty({ type: 'integer', required: false })
    @IsNumber()
    readonly categoryIndex: number;
}