import { Environment } from '../constants';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { UserFriendCategoryDto } from '../models/dto';

export class HttpService {
  private readonly apiURL: string = Environment.getApiUrl();
  public getUserGroupCateogories(userId: string): AxiosPromise<UserFriendCategoryDto[]> {
    const url = `${this.apiURL}/users/${userId}/userFriendCategories`;
    return axios.get(url);
  }
}
