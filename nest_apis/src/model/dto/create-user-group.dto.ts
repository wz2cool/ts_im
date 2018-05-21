import { IsString, IsInt, IsBoolean, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserGroupDto {
    @ApiModelProperty({ type: 'integer' })
    @IsNumber()
    readonly groupId: number;

    @ApiModelProperty({ type: 'integer' })
    @IsNumber()
    readonly userId: number;

    @ApiModelProperty({ type: 'integer' })
    @IsNumber()
    readonly userGroupCategoryId: number;

    @ApiModelProperty({ type: String, required: false })
    @IsNumber()
    readonly displayName: string;
}
