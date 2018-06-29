import { UserInfoDto } from "./user-info.dto";

export class UserInfoPageDto {
  pageNum: number;
  pageSize: number;
  total: number;
  pages: number;
  entites: UserInfoDto[];
}
