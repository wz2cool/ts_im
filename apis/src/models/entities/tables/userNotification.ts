import { column, TableEntity } from "tsbatis";

export class UserNotification extends TableEntity {
    @column("id", true, true)
    public id: number;
    @column("user_id", false, false)
    public userId: number;
    @column("notificaiton_type", false, false)
    public notificaitonType: number;
    @column("content", false, false)
    public content: string;
    @column("request_id", false, false)
    public requestId: number;
    @column("create_time", false, false)
    public createTime: Date;

    public getTableName(): string {
        return "user_notification";
    }
}
