import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Game} from "../../model/game";

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.scss'],
})
export class GameResultsComponent implements OnInit {

  @Input()
  public games: Game[];

  ngOnInit() {
    const compareFn = (a, b) => moment(a.playDate).valueOf() - moment(b.playDate).valueOf();
    this.games = this.games.sort(compareFn);
  }
}
