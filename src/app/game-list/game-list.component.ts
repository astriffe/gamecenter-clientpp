import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../model/game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  @Input()
  public games: Game[];

  constructor() { }

  ngOnInit() {
  }

}
