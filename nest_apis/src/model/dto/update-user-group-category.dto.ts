import { IsString, IsInt, IsBoolean, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserGroupCategoryDto {
    @ApiModelProperty({ type: String, required: false })
    @IsString()
    readonly categoryName: string;

    @ApiModelProperty({ type: 'integer', required: false })
    @IsNumber()
    readonly categoryIndex: number;
}