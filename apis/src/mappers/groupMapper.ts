import { BaseTableMapper } from "tsbatis";
import { Group } from "../models/entities/tables/group";

export class GroupMapper extends BaseTableMapper<Group> {
    public getEntityClass(): new () => Group {
        return Group;
    }
}
