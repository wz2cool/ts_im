import { IsString, IsInt, IsBoolean, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserConversationDto {
    @ApiModelProperty({ type: String, required: false })
    @IsNumber()
    readonly title: string;
}