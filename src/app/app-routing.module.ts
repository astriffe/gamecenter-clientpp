import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GamesRegionComponent} from './components/games-region/games-region.component';
import {GameDataResolve} from './services/game-data-resolve';

const routes: Routes = [
  {
    path: ':region',
    component: GamesRegionComponent,
    resolve: {
      gameData: GameDataResolve
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/SVRBE'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: [GameDataResolve]
})
export class AppRoutingModule {
}
