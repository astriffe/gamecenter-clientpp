import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DateUtil} from '../../util/date.util';
import {Game} from '../../model/game';
import {SetResult} from '../../model/set-result';

@Component({
  selector: 'app-game-result-entry',
  templateUrl: './game-result-entry.component.html',
  styleUrls: ['./game-result-entry.component.scss'],
})
export class GameResultEntryComponent {

  @Input()
  public game: Game;

  @Output()
  public teamClicked$: EventEmitter<string> = new EventEmitter<string>();

  public get date(): string {
    return DateUtil.extractDate(this.game.playDate);
  }

  public get time(): string {
    return DateUtil.extractTime(this.game.playDate);
  }

  getHomeSets(): number {
    return this.getSetResults().filter(setResult => setResult && setResult.home > setResult.away).length;
  }

  getAwaySets(): number {
    return this.getSetResults().filter(setResult => setResult && setResult.home < setResult.away).length;
  }

  getSetResults(): SetResult[] {
    return this.game.setResults;
  }

  homeWins(): boolean {
    return this.getHomeSets() > this.getAwaySets();
  }
}
