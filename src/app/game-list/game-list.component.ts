import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../model/game';
import { SpreadsheetService } from '../services/spreadsheet.service';
import { DateUtil } from '../util/date.util';
import { AddressUtil } from '../util/address.util';
import * as moment from 'moment';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {

  @Input()
  public games: Game[];

  constructor(private spreadsheetService: SpreadsheetService,
              private calendarService: CalendarService) {
  }

  ngOnInit() {
    const compareFn = (a, b) => moment(a.playDate).valueOf() - moment(b.playDate).valueOf();
    this.games = this.games.sort(compareFn);
  }

  public exportSpreadsheet(): void {
    const spreadsheetData = this.games.map((game) => {
      return {
        datum: DateUtil.extractDate(game.playDate),
        zeit: DateUtil.extractTime(game.playDate),
        heimmannschaft: game.teams.home.caption,
        gastmannschaft: game.teams.away.caption,
        adresse: AddressUtil.getFullAddress(game.hall),
        liga: game.league.caption,
      };
    });
    this.spreadsheetService.exportAsExcelFile(spreadsheetData, 'volleyball');
  }

  public exportCalendarEntries() {
    const element = document.createElement('a');
    const calendarData = encodeURIComponent(this.calendarService.generateCalendar(this.games));
    element.setAttribute('href', `data:text/calendar;charset=utf-8,${calendarData}`);
    element.setAttribute('download', 'volleyball.ics');
    element.setAttribute('target', '_blank');
    element.style.display = 'none';
    element.click();
  }
}
