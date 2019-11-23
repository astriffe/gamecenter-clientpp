import { Game } from '../model/game';
import * as ics from 'ics';
import * as moment from 'moment';
import { AddressUtil } from './address.util';
import { Moment } from 'moment';

export class CalendarUtil {

  public static generateCalendar(games: Game[]): string {

    const {error, value} = ics.createEvents(games.map((game: Game) => {

      const start: Moment = moment.tz(game.playDate, 'Europe/Zurich');
      return {
        title: `Volleyball: Match`,
        start: [start.year(), start.month(), start.day(), start.hour(), start.minute()],
        duration: {hours: 2, minutes: 0},
        location: AddressUtil.getFullAddress(game.hall),
        description: `Match ${game.teams.home.caption} - ${game.teams.away.caption}`,
      };
    }));
    if (error) {
      console.error(error);
    }
    return value;
  }
}
