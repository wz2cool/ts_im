import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { Environment } from "../constants";
import { UserFilterDto, UserInfoPageDto } from "../models/dto";

export class UserHttpService {
  private readonly apiURL: string = Environment.getApiUrl();
  private readonly token: string = Environment.getToken();
  private readonly config: AxiosRequestConfig;
  private constructor() {
    this.config = { headers: { Authorization: `Bearer ${this.token}` } };
  }

  private static readonly instance = new UserHttpService();
  public static getInstance(): UserHttpService {
    return this.instance;
  }

  public getUserInfosByFilter(UserFilterDto: UserFilterDto, pageNum: number, pageSize: number): AxiosPromise<UserInfoPageDto> {
    console.log("get data");
    const url = `${this.apiURL}/users/filter/?pageNum=${pageNum}&pageSize=${pageSize}`;
    return axios.post(url, UserFilterDto, this.config);
  }
}
