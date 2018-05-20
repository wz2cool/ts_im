import { IsString, IsInt, IsBoolean, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserGroupDto {
    @ApiModelProperty({ type: 'integer', required: false })
    @IsNumber()
    readonly userGroupCategoryId: number;

    @ApiModelProperty({ type: String, required: false })
    @IsNumber()
    readonly displayName: string;
}
