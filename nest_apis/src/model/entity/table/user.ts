import { column, TableEntity } from 'tsbatis';

export class User extends TableEntity {
    @column('id', true, true)
    public id: number;
    @column('user_name', false, false)
    public userName: string;
    @column('email', false, false)
    public email: string;
    @column('mobile', false, false)
    public mobile: string;
    @column('password', false, false)
    public password: string;
    @column('display_name', false, false)
    public displayName: string;
    @column('create_time', false, false)
    public createTime: Date;
    @column('update_time', false, false)
    public updateTime: Date;
    @column('deleted', false, false)
    public deleted: number;

    public getTableName(): string {
        return 'user';
    }
}
