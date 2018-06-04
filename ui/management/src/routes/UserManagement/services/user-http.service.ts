import axios, { AxiosPromise } from 'axios';
import { Environment } from '../../../constants';
import { UserFilterDto, UserInfoPageDto } from '../../../models/dto';

export class UserHttpService {
    private static readonly apiURL: string = Environment.getApiUrl();
    private constructor() { }

    public static getUserInfosByFilter(UserFilterDto: UserFilterDto, pageNum: number, pageSize: number)
        : AxiosPromise<UserInfoPageDto> {
        const url = `${this.apiURL}/users/filter/?pageNum=${pageNum}&pageSize=${pageSize}`;
        return axios.post(url, UserFilterDto);
    }
}