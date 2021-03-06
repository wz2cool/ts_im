import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { Environment } from "../constants";
import { UserFilterDto, UserInfoPageDto, CreateUserDto } from "../models/dto";

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
    const url = `${this.apiURL}/users/filter/?pageNum=${pageNum}&pageSize=${pageSize}`;
    return axios.post(url, UserFilterDto, this.config);
  }

  public createUser(dto: CreateUserDto): AxiosPromise<void> {
    const url = `${this.apiURL}/users`;
    return axios.post(url, dto, this.config);
  }

  public deleteUser(userId: number): AxiosPromise<void> {
    const url = `${this.apiURL}/users/${userId}`;
    return axios.delete(url, this.config);
  }

  public activeUser(userId: number): AxiosPromise<void> {
    const url = `${this.apiURL}/users/${userId}/active`;
    return axios.put(url, null, this.config);
  }
}
