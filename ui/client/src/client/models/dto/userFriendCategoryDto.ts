import { UserBaseInfoDto } from './userBaseInfoDto';

export class UserFriendCategoryDto {
  id: number;
  categoryName: string;
  categoryIndex: number;
  isOpen: boolean;
  userBaseInfos: UserBaseInfoDto[];
}