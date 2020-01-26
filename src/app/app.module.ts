import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {SpreadsheetService} from './services/spreadsheet.service';
import {CalendarService} from './services/calendar.service';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {QueryParamModule} from "@ngqp/core";
import {AutoCompleteInputComponent} from "./components/auto-complete-input/auto-complete-input.component";
import {ButtonComponent} from "./components/button/button.component";
import {GameListEntryComponent} from "./components/game-list-entry/game-list-entry.component";
import {GameListComponent} from "./components/game-list/game-list.component";
import {GamesRegionComponent} from './components/games-region/games-region.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {MatTabsModule} from "@angular/material/tabs";
import {GameResultsComponent} from "./components/game-results/game-results.component";
import {GameResultEntryComponent} from "./components/game-result-entry/game-result-entry.component";

@NgModule({
  declarations: [
    AppComponent,
    AutoCompleteInputComponent,
    GameListComponent,
    GameListEntryComponent,
    GameResultsComponent,
    GameResultEntryComponent,
    ButtonComponent,
    GamesRegionComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatDividerModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatTooltipModule,
    QueryParamModule.withConfig({routerOptions: {replaceUrl: false}}),
    MatTabsModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de-CH'},
    SpreadsheetService,
    CalendarService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
