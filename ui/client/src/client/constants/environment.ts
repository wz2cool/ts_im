declare const VERSION: string;
declare const API_URL: string;
export class Environment {
  public static getVersion() {
    return VERSION;
  }

  public static getApiUrl() {
    return API_URL;
  }

  private constructor() {
  }
}