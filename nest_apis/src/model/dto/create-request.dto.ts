import { IsString, IsInt, IsBoolean, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateRequestDto {
    @ApiModelProperty({ type: 'integer' })
    @IsNumber()
    readonly requestType: number;

    @ApiModelProperty({ type: 'integer' })
    @IsNumber()
    readonly requestUserId: number;

    @ApiModelProperty({ type: String })
    @IsString()
    readonly content: string;

    @ApiModelProperty({ type: String })
    @IsString()
    readonly remark: string;

    @ApiModelProperty({ type: 'integer' })
    @IsNumber()
    readonly matchId: number;
}