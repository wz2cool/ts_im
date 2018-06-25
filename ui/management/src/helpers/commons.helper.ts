import { ObjectUtils } from "ts-commons";

export class CommonsHelper {
  public static isMobile(str: string): boolean {
    if (!ObjectUtils.isString(str)) {
      return false;
    }
    const regex = /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/;
    return regex.test(str);
  }
}
