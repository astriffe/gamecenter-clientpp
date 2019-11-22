import { Hall } from './hall';
import { Teams } from './teams';
import { League } from './league';

export interface Game {
  gameId: number;
  playDate: string;
  gender: string;
  teams: Teams;
  league: League;
  group: { groupId: number, caption: string };
  hall: Hall;
}
