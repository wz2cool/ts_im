import { column, TableEntity } from "tsbatis";

export class UserFriend extends TableEntity {
    @column("id", true, true)
    public id: number;
    @column("user_id", false, false)
    public userId: number;
    @column("friend_user_id", false, false)
    public friendUserId: number;
    @column("create_time", false, false)
    public createTime: Date;

    public getTableName(): string {
        return "user_friend";
    }
}
