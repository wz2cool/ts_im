import { column, TableEntity } from 'tsbatis';

export class UserGroup extends TableEntity {
  @column('id', true, true)
  id: number;
  @column('group_id', false, false)
  groupId: number;
  @column('user_id', false, false)
  userId: number;
  @column('user_group_category_id', false, false)
  userGroupCategoryId: number;
  @column('display_name', false, false)
  displayName: string;
  @column('create_time', false, false)
  createTime: Date;
  @column('update_time', false, false)
  updateTime: Date;

  getTableName(): string {
    return 'user_group';
  }
}
