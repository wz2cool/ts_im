import { BaseTableMapper } from 'tsbatis';
import { UserGroupCategory } from '../model/entity/table/user-group-category';

export class UserGroupCategoryMapper extends BaseTableMapper<UserGroupCategory> {
    public getEntityClass(): new () => UserGroupCategory {
        return UserGroupCategory;
    }
}
