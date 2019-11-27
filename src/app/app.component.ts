import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Game} from './model/game';
import {takeUntil, tap} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../environments/environment';
import {QueryParamBuilder, QueryParamGroup} from "@ngqp/core";
import {Team} from "./model/teams";
import {League} from "./model/league";
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'gamecenter-client';

  private destroy$ = new Subject<void>();
  private gameData: Game[] = [];

  public allTeams: string[];
  private allLeagues: string[];
  public availableLeagues: string[] = [];
  private teamLeagues: Map<string, string[]> = new Map<string, []>();

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
      dateFrom: new FormControl(moment()),
      dateUntil: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.httpClient.get(environment.dataUrl)
      .pipe(
        tap((games: Game[]) => this.gameData = games),
        tap((games) => this.extractAllTeams(games)),
        tap((games) => this.extractAllLeagues(games)),
        tap((games) => this.createTeamToLeagueMap(games)),
        tap(() => this.updateSelectedTeam(this.filterForm.controls['team'].value)),
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
      result = result.filter(game => moment.tz(game.playDate, 'Europe/Zurich').isAfter(moment(this.filterFrom).subtract(1, 'day')));
    }
    if (this.filterUntil) {
      result = result.filter(game => moment.tz(game.playDate, 'Europe/Zurich').isBefore(moment(this.filterUntil).add(1, 'day')));
    }
    this.filteredGames = result;
  }

  public updateSelectedTeam(team: string): void {
    this.searchParams.get('team').setValue(team as any);
    this.availableLeagues = team ? this.teamLeagues.get(team) : this.allLeagues;
    this.availableLeagues.sort();
  }

  public updateSelectedLeague(league: string): void {
    this.searchParams.get('league').setValue(league as any);
  }

  private extractAllLeagues(games: Game[]): void {
    this.allLeagues = [...new Set(games.map((game: Game) => game.league.caption))];
    this.allLeagues.sort();
    this.availableLeagues = this.allLeagues;
  }

  private extractAllTeams(games: Game[]) {
    this.allTeams = [
      ...new Set(games
        .map(game => game.teams.home.caption)
        .concat(games.map(game => game.teams.away.caption))
      )];
    this.allTeams.sort();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  private createTeamToLeagueMap(games: Game[]) {
    games.forEach((game) => {
      this.addOrUpdateTeamLeague(game.teams.home, game.league);
      this.addOrUpdateTeamLeague(game.teams.away, game.league);
    });
  }

  private addOrUpdateTeamLeague(team: Team, league: League): void {
    const currentLeagues = this.teamLeagues.get(team.caption);
    currentLeagues
      ? this.teamLeagues.set(team.caption, [...new Set([...currentLeagues, league.caption])])
      : this.teamLeagues.set(team.caption, [league.caption]);
  }
}

