import * as moment from 'moment';

export class DateUtil {
  public static extractDate(datetime: string): string {
    return moment.tz(datetime, 'Europe/Zurich').format('DD.MM.YYYY');
  }

  public static extractTime(datetime: string): string {
    return moment.tz(datetime, 'Europe/Zurich').format('HH:mm');
  }

  public static extractWeekday(datetime: string): string {
    return moment.tz(datetime, 'Europe/Zurich').format('dd');
  }
}
