import { column, TableEntity } from 'tsbatis';

export class GroupMessage extends TableEntity {
    @column('id', true, true)
    public id: number;
    @column('group_id', false, false)
    public groupId: number;
    @column('user_id', false, false)
    public userId: number;
    @column('message_id', false, false)
    public messageId: number;
    @column('send_time', false, false)
    public sendTime: Date;

    public getTableName(): string {
        return 'group_message';
    }
}
