import { column, TableEntity } from "tsbatis";

export class GroupUser extends TableEntity {
    @column("id", true, true)
    public id: number;
    @column("group_id", false, false)
    public groupId: number;
    @column("user_id", false, false)
    public userId: number;
    @column("display_name", false, false)
    public displayName: string;
    @column("create_time", false, false)
    public createTime: Date;

    public getTableName(): string {
        return "group_user";
    }
}
