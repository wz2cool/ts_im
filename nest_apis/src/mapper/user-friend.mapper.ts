import { BaseTableMapper } from 'tsbatis';
import { UserFriend } from '../model/entity/table/userFriend';

export class UserFriendMapper extends BaseTableMapper<UserFriend> {
    public getEntityClass(): new () => UserFriend {
        return UserFriend;
    }
}
