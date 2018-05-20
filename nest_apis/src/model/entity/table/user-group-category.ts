import { column, TableEntity } from 'tsbatis';

export class UserGroupCategory extends TableEntity {
    @column('id', true, true)
    public id: number;
    @column('user_id', false, false)
    public userId: number;
    @column('category_name', false, false)
    public categoryName: string;
    @column('category_index', false, false)
    public categoryIndex: number;
    @column('create_time', false, false)
    public createTime: Date;
    @column('update_time', false, false)
    public updateTime: Date;

    public getTableName(): string {
        return 'user_group_category';
    }
}
