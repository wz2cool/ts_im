import { IsString, IsInt, IsBoolean, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserConversationDto {
    @ApiModelProperty({ type: 'integer' })
    @IsNumber()
    readonly userId: number;

    @ApiModelProperty({ type: 'integer' })
    @IsNumber()
    readonly conversationType: number;

    @ApiModelProperty({ type: String })
    @IsNumber()
    readonly title: string;

    @ApiModelProperty({ type: 'integer' })
    @IsNumber()
    readonly matchId: number;
}