import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateUserFriendDto {
    @ApiModelProperty({ type: 'integer' })
    @IsNumber()
    readonly userId: number;

    @ApiModelProperty({ type: 'integer' })
    @IsNumber()
    readonly friendUserId: number;

    @ApiModelProperty({ type: 'integer' })
    @IsNumber()
    readonly userFriendCategoryId: number;
}