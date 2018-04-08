import { column, TableEntity } from "tsbatis";

export class UserDetail extends TableEntity {
    @column("id", true, true)
    public id: number;
    @column("user_id", false, false)
    public userId: number;
    @column("age", false, false)
    public age: number;
    @column("sex", false, false)
    public sex: number;
    @column("province", false, false)
    public province: string;
    @column("city", false, false)
    public city: string;
    @column("qq", false, false)
    public qq: string;
    @column("wechat", false, false)
    public wechat: string;
    @column("create_time", false, false)
    public createTime: Date;
    @column("update_time", false, false)
    public updateTime: Date;

    public getTableName(): string {
        return "user_detail";
    }
}
