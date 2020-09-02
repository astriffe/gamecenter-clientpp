import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {Game} from '../../model/game';
import {SpreadsheetService} from '../../services/spreadsheet.service';
import {CalendarService} from '../../services/calendar.service';
import {DateUtil} from '../../util/date.util';
import {AddressUtil} from '../../util/address.util';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {

  @Input()
  public games: Game[];

  @Output()
  public teamClicked$: EventEmitter<string> = new EventEmitter<string>();

  constructor(private spreadsheetService: SpreadsheetService,
              private calendarService: CalendarService) {
  }

  ngOnInit() {
    const compareFn = (a, b) => moment(a.playDate).valueOf() - moment(b.playDate).valueOf();
    this.games = this.games.sort(compareFn);
  }

  public exportSpreadsheet(): void {
    const filename = `volleyball-${this.games[0].league.caption}`
      .replace(new RegExp('\\s', 'g'), '')
      .replace(new RegExp('\\.', 'g'), '_');
    this.spreadsheetService.exportAsExcelFile(this.games, filename);
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
