import { IsString, IsInt, IsBoolean, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateGroupMessageDto {
    @ApiModelProperty({ type: 'integer' })
    @IsNumber()
    readonly senderUserId: number;

    @ApiModelProperty({ type: 'integer' })
    @IsNumber()
    readonly groupId: number;

    @ApiModelProperty({ type: 'integer' })
    @IsNumber()
    readonly messageType: number;

    @ApiModelProperty({ type: String })
    @IsString()
    readonly content: string;

    @ApiModelProperty({ type: String })
    @IsString()
    readonly sourceUri: string;
}