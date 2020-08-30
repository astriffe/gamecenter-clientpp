import {Injectable} from '@angular/core';
import {Game} from '../model/game';
import * as moment from 'moment';
import {AddressUtil} from '../util/address.util';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {

  private readonly LINE_FEED = '\r\n';

  constructor() {
  }

  public generateCalendar(games: Game[]): string {
    return [
      'BEGIN:VCALENDAR',
      'PRODID:-//striffeler//gamecenter-export//DE',
      'VERSION:2.0',
      this.generateEventEntries(games),
      'END:VCALENDAR',
    ].join(this.LINE_FEED);
  }

  private generateEventEntries(games: Game[]): string {
    return games.map((game) => this.generateEventEntry(game)).join(this.LINE_FEED);
  }

  private generateEventEntry(game: Game): string {

    const start = moment.tz(game.playDate, 'Europe/Zurich');
    const end = moment.tz(game.playDate, 'Europe/Zurich').add(2, 'hours');
    return [
      `BEGIN:VEVENT`,
      `DTSTAMP:${moment().format('YYYYMMDD\THHmmss')}`,
      `DTSTART:${start.format('YYYYMMDD\THHmmss')}`,
      `DTEND:${end.format('YYYYMMDD\THHmmss')}`,
      `SUMMARY:Volley: ${game.teams.home.caption} - ${game.teams.away.caption}`,
      `DESCRIPTION:Volleyball Match ${game.teams.home.caption} - ${game.teams.away.caption}`,
      `LOCATION:${AddressUtil.getFullAddress(game.hall)}`,
      `END:VEVENT`,
    ].join(this.LINE_FEED);
  }
}
