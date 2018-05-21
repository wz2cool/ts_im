import { BaseTableMapper } from 'tsbatis';
import { UserDetail } from '../model/entity/table/userDetail';

export class UserDetailMapper extends BaseTableMapper<UserDetail> {
    public getEntityClass(): new () => UserDetail {
        return UserDetail;
    }
}
