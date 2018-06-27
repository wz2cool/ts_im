import { IsString, IsInt, IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiModelProperty({ type: String })
    @IsString()
    readonly userName: string;

    @ApiModelProperty({ type: String })
    @IsString()
    readonly email: string;

    @ApiModelProperty({ type: String })
    @IsString()
    readonly mobile: string;

    @ApiModelProperty({ type: String })
    @IsString()
    readonly password: string;

    @ApiModelProperty({ type: String, required: false })
    @IsString()
    @IsOptional()
    readonly displayName: string;

    @ApiModelProperty({ type: String, required: false })
    @IsString()
    @IsOptional()
    readonly imageUrl: string;

    @ApiModelProperty({ type: 'integer' })
    @IsNumber()
    readonly source: number;
}
