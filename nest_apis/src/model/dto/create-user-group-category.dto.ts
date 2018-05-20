import { IsString, IsInt, IsBoolean, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserGroupCategoryDto {
    @ApiModelProperty({ type: 'integer' })
    @IsNumber()
    readonly userId: number;

    @ApiModelProperty({ type: String })
    @IsString()
    readonly categoryName: string;

    @ApiModelProperty({ type: 'integer' })
    @IsNumber()
    readonly categoryIndex: number;
}