export interface Teams {
  home: Team;
  away: Team;
}

export interface Team {
  teamId: number;
  caption: string;
  clubCaption: string;
  clubId: number;
}
