import {Injectable} from '@angular/core';
import zipcelx from 'zipcelx';
import {Game} from '../model/game';
import {DateUtil} from '../util/date.util';
import {AddressUtil} from '../util/address.util';

@Injectable({
  providedIn: 'root',
})
export class SpreadsheetService {

  public exportAsExcelFile(games: Game[], excelFileName: string): void {
    const config = {
      filename: excelFileName,
      sheet: {
        data: [this.createHeaderRow(), ...this.createCellObjects(games)]
      }
    };
    zipcelx(config);
  }

  private createHeaderRow(): Cell[] {
    return [
      this.createStringCell('Datum'),
      this.createStringCell('Zeit'),
      this.createStringCell('Heim'),
      this.createStringCell('Gast'),
      this.createStringCell('Adresse'),
      this.createStringCell('Liga')
    ];
  }

  private createCellObjects(games: Game[]): Cell[][] {
    return games.map((game) => [
      this.createStringCell(DateUtil.extractDate(game.playDate)),
      this.createStringCell(DateUtil.extractTime(game.playDate)),
      this.createStringCell(game.teams.home.caption),
      this.createStringCell(game.teams.away.caption),
      this.createStringCell(AddressUtil.getFullAddress(game.hall)),
      this.createStringCell(game.league.caption),
    ]);
  }

  private createStringCell(data: string): Cell {
    return {value: data, type: 'string'};
  }

}

interface Cell {
  value: string | number;
  type: 'string' | 'number';
}
