import { Environment } from '../constants';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { UserFriendCategoryDto, UserBaseInfoDto } from '../models/dto';

export class HttpService {
  private static readonly apiURL: string = Environment.getApiUrl();
  public static getUserFriendCateogories(userId: number): AxiosPromise<UserFriendCategoryDto[]> {
    const url = `${this.apiURL}/users/${userId}/userFriendCategories`;
    return axios.get(url);
  }

  public static getUsersByUserFriendCategoryId(userFriendCategoryId: number): AxiosPromise<UserBaseInfoDto[]> {
    const url = `${this.apiURL}/userFriendCategory/${userFriendCategoryId}/users`;
    return axios.get(url);
  }
}
