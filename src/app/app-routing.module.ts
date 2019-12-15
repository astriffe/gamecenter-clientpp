import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GamesRegionComponent} from "./components/games-region/games-region.component";

const routes: Routes = [
  {
    path: ':region',
    component: GamesRegionComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/SVRBE'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
