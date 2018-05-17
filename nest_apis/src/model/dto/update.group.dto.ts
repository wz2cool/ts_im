import { IsString, IsInt, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateGroupDto {
    @ApiModelProperty({ type: String, required: false })
    @IsString()
    readonly groupName: string;

    @ApiModelProperty({ type: String, required: false })
    @IsString()
    readonly subject: string;

    @ApiModelProperty({ type: Boolean, required: false })
    @IsBoolean()
    readonly canInvite: boolean;

    @ApiModelProperty({ type: Boolean, required: false })
    @IsBoolean()
    readonly canRegister: boolean;

    @ApiModelProperty({ type: Boolean, required: false })
    @IsBoolean()
    readonly publicGroup: boolean;

    @ApiModelProperty({ type: String, required: false })
    @IsString()
    readonly description: string;
}
