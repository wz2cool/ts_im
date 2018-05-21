import { BaseTableMapper } from 'tsbatis';
import { User } from '../model/entity/table/user';

export class UserMapper extends BaseTableMapper<User> {
    public getEntityClass(): new () => User {
        return User;
    }
}
