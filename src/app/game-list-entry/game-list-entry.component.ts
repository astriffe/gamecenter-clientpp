import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../model/game';
import * as moment from 'moment';

@Component({
  selector: 'app-game-list-entry',
  templateUrl: './game-list-entry.component.html',
  styleUrls: ['./game-list-entry.component.scss'],
})
export class GameListEntryComponent implements OnInit {

  @Input()
  public game: Game;

  constructor() {
  }

  ngOnInit() {
  }

  public get date(): string {
    return moment.tz(this.game.playDate, 'Europe/Zurich').format('DD.MM.YYYY');
  }

  public get time(): string {
    return moment.tz(this.game.playDate, 'Europe/Zurich').format('HH:mm');
  }

  public get address(): string {
    const location = this.game.hall;
    return `${location.street} ${location.number}, ${location.zip} ${location.city}`;
  }

  public get hyperlink(): string {
    const location = this.game.hall;
    return `http://map.search.ch/${location.city}/${location.street}.${location.number}`;
  }

}


