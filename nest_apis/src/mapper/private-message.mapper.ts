import { BaseTableMapper } from 'tsbatis';
import { PrivateMessage } from '../model/entity/table/privateMessage';

export class PrivateMessageMapper extends BaseTableMapper<PrivateMessage> {
    public getEntityClass(): new () => PrivateMessage {
        return PrivateMessage;
    }
}
