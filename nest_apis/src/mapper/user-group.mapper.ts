import { BaseTableMapper } from 'tsbatis';
import { UserGroupCategory } from '../model/entity/table/user-group-category';
import { UserGroup } from '../model/entity/table/user-group';

export class UserGroupMapper extends BaseTableMapper<UserGroup> {
    public getEntityClass(): new () => UserGroup {
        return UserGroup;
    }
}
