import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateUtil} from '../../util/date.util';
import {Game} from '../../model/game';
import {AddressUtil} from '../../util/address.util';

@Component({
  selector: 'app-game-list-entry',
  templateUrl: './game-list-entry.component.html',
  styleUrls: ['./game-list-entry.component.scss'],
})
export class GameListEntryComponent {

  @Input()
  public game: Game;

  @Output()
  public teamClicked$: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  public get date(): string {
    return DateUtil.extractDate(this.game.playDate);
  }

  public get time(): string {
    return DateUtil.extractTime(this.game.playDate);
  }

  public get dayOfWeek(): string {
    return DateUtil.extractWeekday(this.game.playDate);
  }

  public get address(): string {
    return AddressUtil.getFullAddress(this.game.hall);
  }

  public get hyperlink(): string {
    return AddressUtil.getHyperlink(this.game.hall);
  }

}


