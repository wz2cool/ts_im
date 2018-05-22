import { BaseTableMapper } from 'tsbatis';
import { UserConversation } from '../model/entity/table/userConversation';

export class UserConversationMapper extends BaseTableMapper<UserConversation> {
    public getEntityClass(): new () => UserConversation {
        return UserConversation;
    }
}
