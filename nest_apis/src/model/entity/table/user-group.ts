import { column, TableEntity } from 'tsbatis';

export class UserGroup extends TableEntity {

    @column('id', true, true)
    public id: number;
    @column('group_id', false, false)
    public groupId: number;
    @column('user_id', false, false)
    public userId: number;
    @column('user_group_category_id', false, false)
    public userGroupCategoryId: number;
    @column('display_name', false, false)
    public displayName: string;
    @column('user_group', false, false)
    public createTime: Date;

    getTableName(): string {
        return 'user_group';
    }
}