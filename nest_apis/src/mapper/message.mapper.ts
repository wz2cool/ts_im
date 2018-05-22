import { BaseTableMapper } from 'tsbatis';
import { Message } from '../model/entity/table/message';

export class MessageMapper extends BaseTableMapper<Message> {
    public getEntityClass(): new () => Message {
        return Message;
    }
}
