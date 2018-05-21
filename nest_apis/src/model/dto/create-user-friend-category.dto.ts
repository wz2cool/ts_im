import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateUserFriendCategoryDto {
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