import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { identity, noop, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-auto-complete-input',
  templateUrl: './auto-complete-input.component.html',
  styleUrls: ['./auto-complete-input.component.scss'],
})
export class AutoCompleteInputComponent<T> implements OnInit {

  @Input()
  private readonly options: T[];

  @Input()
  public placeholder: string;

  @Input()
  public formControl: AbstractControl | FormControl;

  // @Input()
  @Output()
  public selectedValue = new EventEmitter<T>();

  @Input()
  public toStringFn: (T) => string;

  public filteredOptions: Observable<T[]>;

  constructor() {
    if (!this.toStringFn) {
      this.toStringFn = (a) => a;
    }
  }

  public ngOnInit(): void {
    this.filteredOptions = this.formControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
  }

  public changeSelection(selection: T): void {
    this.selectedValue.emit(selection);
  }

  private _filter(value: string): T[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => this.toStringFn(option).toLowerCase().includes(filterValue));
  }
}
