import { UserInfoDto } from "./user-info.dto";

export class UserInfoPageDto {
    readonly pageNum: number;
    readonly pageSize: number;
    readonly total: number;
    readonly pages: number;
    readonly entites: UserInfoDto[];
}