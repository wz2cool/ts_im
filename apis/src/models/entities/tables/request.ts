import { column, TableEntity } from "tsbatis";

export class Request extends TableEntity {
    @column("id", true, true)
    public id: number;
    @column("request_type", false, false)
    public requestType: number;
    @column("request_user_id", false, false)
    public requestUserId: number;
    @column("content", false, false)
    public content: string;
    @column("remark", false, false)
    public remark: string;
    @column("match_id", false, false)
    public matchId: number;
    @column("create_time", false, false)
    public createTime: Date;
    @column("status", false, false)
    public status: number;

    public getTableName(): string {
        return "request";
    }
}
