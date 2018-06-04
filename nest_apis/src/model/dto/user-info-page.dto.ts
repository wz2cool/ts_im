import { IPageDto } from './page.dto';
import { UserInfoDto } from './user-info.dto';
import { IsString, IsInt, IsBoolean, IsNumber, IsDate } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserInfoPageDto implements IPageDto<UserInfoDto> {
    @ApiModelProperty({ type: Number })
    @IsNumber()
    readonly pageNum: number;

    @ApiModelProperty({ type: Number })
    @IsNumber()
    readonly pageSize: number;

    @ApiModelProperty({ type: Number })
    @IsNumber()
    readonly total: number;

    @ApiModelProperty({ type: Number })
    @IsNumber()
    readonly pages: number;

    @ApiModelProperty({ isArray: true, type: UserInfoDto })
    entites: UserInfoDto[];

    constructor(pageNum: number, pageSize: number, total: number, pages: number, entites: UserInfoDto[]) {
        this.pageNum = pageNum;
        this.pageSize = pageSize;
        this.total = total;
        this.pages = pages;
        this.entites = entites;
    }
}