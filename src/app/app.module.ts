import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { AutoCompleteInputComponent } from './auto-complete-input/auto-complete-input.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GameListComponent } from './game-list/game-list.component';
import { GameListEntryComponent } from './game-list-entry/game-list-entry.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { SpreadsheetService } from './services/spreadsheet.service';
import { CalendarService } from './services/calendar.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from './button/button.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {QueryParamModule} from "@ngqp/core";

@NgModule({
  declarations: [
    AppComponent,
    AutoCompleteInputComponent,
    GameListComponent,
    GameListEntryComponent,
    ButtonComponent,
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
    QueryParamModule,
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
