import { BaseTableMapper } from 'tsbatis';
import { GroupMessage } from '../model/entity/table/groupMessage';

export class GroupMessageMapper extends BaseTableMapper<GroupMessage> {
    public getEntityClass(): new () => GroupMessage {
        return GroupMessage;
    }
}
