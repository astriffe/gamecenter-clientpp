import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Game} from './model/game';
import {takeUntil, tap} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import 'moment-timezone';
import {environment} from '../environments/environment';
import {QueryParamBuilder, QueryParamGroup} from "@ngqp/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'gamecenter-client';

  private destroy$ = new Subject<void>();
  private gameData: Game[] = [];

  public availableLeagues: string[] = [];
  public availableTeams: any[] = [];

  public selectedLeague: string;
  public selectedTeam: string;
  public filterHomeGame: boolean;
  public filterFrom: string;
  public filterUntil: string;
  public filteredGames: Game[] = [];

  public filterForm: FormGroup;
  public searchParams: QueryParamGroup;

  constructor(private httpClient: HttpClient, private queryParamBuilder: QueryParamBuilder, private formBuilder: FormBuilder) {
    this.searchParams = queryParamBuilder.group({
      team: queryParamBuilder.stringParam('t'),
      league: queryParamBuilder.stringParam('l')
    });

    this.filterForm = formBuilder.group({
      team: new FormControl('', Validators.required),
      league: new FormControl('', Validators.required),
      homeGame: new FormControl(''),
      dateFrom: new FormControl(''),
      dateUntil: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.httpClient.get(environment.dataUrl)
      .pipe(
        tap((games: Game[]) => this.gameData = games),
        tap((games) => this.processAvailableTeams(games)),
        tap((games) => this.processAvailableLeagues(games)),
        takeUntil(this.destroy$),
      )
      .subscribe((games: Game[]) => {
        this.gameData = games;
        this.updateFilteredGames();
      });

    this.filterForm.valueChanges
      .pipe(
        tap(() => this.updateFilteredGames()),
        takeUntil(this.destroy$))
      .subscribe();

    this.bindFilterPropertyFormToSearchParam('team');
    this.bindFilterPropertyFormToSearchParam('league');
  }

  private bindFilterPropertyFormToSearchParam(formProperty: string, paramName?: string): void {
    paramName = paramName || formProperty;
    (this.searchParams.get(paramName).valueChanges as Observable<any>)
      .pipe(takeUntil(this.destroy$))
      .subscribe((team) => this.filterForm.controls[formProperty].setValue(team));
  }

  private updateFilteredGames(): void {
    this.selectedTeam = this.filterForm.controls.team.value;
    this.selectedLeague = this.filterForm.controls.league.value;
    this.filterHomeGame = this.filterForm.controls.homeGame.value;
    this.filterFrom = this.filterForm.controls.dateFrom.value;
    this.filterUntil = this.filterForm.controls.dateUntil.value;

    if (!this.selectedTeam || !this.selectedLeague) {
      this.filteredGames = [];
      return;
    }
    let result: Game[] = this.gameData;
    result = result.filter(game => game.teams.home.caption === this.selectedTeam
      || (!this.filterHomeGame && game.teams.away.caption === this.selectedTeam));
    result = result.filter(game => game.league.caption === this.selectedLeague);
    if (this.filterFrom) {
      result = result.filter(game => moment.tz(game.playDate, 'Europe/Zurich').isAfter(this.filterFrom));
    }
    if (this.filterUntil) {
      result = result.filter(game => moment.tz(game.playDate, 'Europe/Zurich').isBefore(this.filterUntil));
    }
    this.filteredGames = result;
  }

  public updateSelectedTeam(team: string): void {
    this.searchParams.get('team').setValue(team as any);
  }

  public updateSelectedLeague(league: string): void {
    this.searchParams.get('league').setValue(league as any);
  }

  private processAvailableLeagues(games: Game[]): void {
    this.availableLeagues = [...new Set(games.map((game: Game) => game.league.caption))];
    this.availableLeagues.sort();
  }

  private processAvailableTeams(games: Game[]) {
    const allTeams = games.map(game => game.teams.home.caption).concat(games.map(game => game.teams.away.caption));
    this.availableTeams = [...new Set(allTeams)];
    this.availableLeagues.sort();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}

