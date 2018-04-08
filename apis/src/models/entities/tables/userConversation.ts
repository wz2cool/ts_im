import { column, TableEntity } from "tsbatis";

export class UserConversation extends TableEntity {
    @column("id", true, true)
    public id: number;
    @column("user_id", false, false)
    public userId: number;
    @column("conversation_type", false, false)
    public conversationType: number;
    @column("title", false, false)
    public title: string;
    @column("match_id", false, false)
    public matchId: number;
    @column("create_time", false, false)
    public createTime: Date;
    @column("update_time", false, false)
    public updateTime: Date;

    public getTableName(): string {
        return "user_conversation";
    }
}
