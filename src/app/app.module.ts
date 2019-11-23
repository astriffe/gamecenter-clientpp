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

@NgModule({
  declarations: [
    AppComponent,
    AutoCompleteInputComponent,
    GameListComponent,
    GameListEntryComponent,
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
