import { BaseTableMapper } from 'tsbatis';
import { Request } from '../model/entity/table/request';

export class RequestMapper extends BaseTableMapper<Request> {
    public getEntityClass(): new () => Request {
        return Request;
    }
}
