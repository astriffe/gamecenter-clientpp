import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Game} from '../model/game';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';


@Injectable()
export class GameDataResolve implements Resolve<Game[]> {

  constructor(private httpClient: HttpClient) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Game[]> | Promise<Game[]> | Game[] {
    const region = route.paramMap.get('region');
    const url = environment.dataUrl.replace('##REGION##', region);
    return this.httpClient.get(url).pipe(map(games => games as Game[]));
  }
}
