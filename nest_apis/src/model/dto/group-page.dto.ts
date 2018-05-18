import { IsString, IsInt, IsBoolean, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { IPageDto } from './page.dto';
import { GroupDto } from './group.dto';

export class GroupPageDto implements IPageDto<GroupDto> {
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

    @ApiModelProperty({ isArray: true, type: GroupDto })
    readonly entites: GroupDto[];

    constructor(pageNum: number, pageSize: number, total: number, pages: number, entites: GroupDto[]) {
        this.pageNum = pageNum;
        this.pageSize = pageSize;
        this.total = total;
        this.pages = pages;
        this.entites = entites;
    }
}
