import { Environment } from '../constants';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { UserFriendCategoryDto } from '../models/dto';

export class HttpService {
  private static readonly apiURL: string = Environment.getApiUrl();
  public static getUserGroupCateogories(userId: number): AxiosPromise<UserFriendCategoryDto[]> {
    const url = `${this.apiURL}/users/${userId}/userFriendCategories`;
    return axios.get(url);
  }
}
