import { column, TableEntity } from "tsbatis";

export class GroupAdmin extends TableEntity {
    @column("id", true, true)
    public id: number;
    @column("group_id", false, false)
    public groupId: number;
    @column("user_id", false, false)
    public userId: number;
    @column("role", false, false)
    public role: number;
    @column("create_time", false, false)
    public createTime: Date;

    public getTableName(): string {
        return "group_admin";
    }
}
