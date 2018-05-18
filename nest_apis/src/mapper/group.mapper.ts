import { BaseTableMapper } from 'tsbatis';
import { Group } from '../model/entity/table/group';

export class GroupMapper extends BaseTableMapper<Group> {
    public getEntityClass(): new () => Group {
        return Group;
    }
}
