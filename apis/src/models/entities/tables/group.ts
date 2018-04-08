import { column, TableEntity } from "tsbatis";

export class Group extends TableEntity {
    @column("id", true, true)
    public id: number;
    @column("group_name", false, false)
    public groupName: string;
    @column("subject", false, false)
    public subject: string;
    @column("description", false, false)
    public description: string;
    @column("can_invite", false, false)
    public canInvite: number;
    @column("can_register", false, false)
    public canRegister: number;
    @column("max_user", false, false)
    public maxUser: number;
    @column("public_group", false, false)
    public publicGroup: number;
    @column("create_time", false, false)
    public createTime: Date;
    @column("update_time", false, false)
    public updateTime: Date;

    public getTableName(): string {
        return "`group`";
    }
}
