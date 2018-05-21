import { BaseTableMapper } from 'tsbatis';
import { UserFriendCategory } from '../model/entity/table/userFriendCategory';

export class UserFriendCategoryMapper extends BaseTableMapper<UserFriendCategory> {
    public getEntityClass(): new () => UserFriendCategory {
        return UserFriendCategory;
    }
}
