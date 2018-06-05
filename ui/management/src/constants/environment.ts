declare const VERSION: string;
declare const API_URL: string;
declare const TOKEN: string;
export class Environment {
  public static getVersion() {
    return VERSION;
  }

  public static getApiUrl() {
    return API_URL;
  }

  public static getToken() {
    return TOKEN;
  }

  private constructor() {}
}
