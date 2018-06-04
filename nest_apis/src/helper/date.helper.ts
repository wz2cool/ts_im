export class DateHelper {
    private constructor() { }

    public static getTimestamp(date: Date): number {
        return Math.round(new Date().getTime() / 1000);
    }
}