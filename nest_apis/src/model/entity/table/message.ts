import { column, TableEntity } from 'tsbatis';

export class Message extends TableEntity {
    @column('id', true, true)
    public id: number;
    @column('message_type', false, false)
    public messageType: number;
    @column('conversation_type', false, false)
    public conversationType: number;
    @column('sender_user_id', false, false)
    public senderUserId: number;
    @column('content', false, false)
    public content: string;
    @column('source_uri', false, false)
    public sourceUri: string;
    @column('send_time', false, false)
    public sendTime: Date;

    public getTableName(): string {
        return 'message';
    }
}
