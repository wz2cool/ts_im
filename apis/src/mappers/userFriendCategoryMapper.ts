import { BaseTableMapper } from "tsbatis";
import { UserFriendCategory } from "../models/entities/tables/userFriendCategory";

export class UserFriendCategoryMapper extends BaseTableMapper<UserFriendCategory> {
    public getEntityClass(): new () => UserFriendCategory {
        return UserFriendCategory;
    }
}
