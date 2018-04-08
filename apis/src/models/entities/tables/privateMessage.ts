import { column, TableEntity } from "tsbatis";

export class PrivateMessage extends TableEntity {
    @column("id", true, true)
    public id: number;
    @column("user_id", false, false)
    public userId: number;
    @column("friend_user_id", false, false)
    public friendUserId: number;
    @column("message_id", false, false)
    public messageId: number;
    @column("send_time", false, false)
    public sendTime: Date;

    public getTableName(): string {
        return "private_message";
    }
}
