import { IsString, IsInt, IsBoolean, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export interface IPageDto<T> {
    readonly pageNum: number;
    readonly pageSize: number;
    readonly total: number;
    readonly pages: number;
    readonly entites: T[];
}