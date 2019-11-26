import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-auto-complete-input',
  templateUrl: './auto-complete-input.component.html',
  styleUrls: ['./auto-complete-input.component.scss'],
})
export class AutoCompleteInputComponent<T> implements OnInit, OnChanges {

  @Input()
  private options: T[];

  @Input()
  public placeholder: string;

  @Input()
  public formControl: AbstractControl | FormControl;

  @Output()
  public selectedValueChange = new EventEmitter<T>();

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
        map(value => this._filter(this.options || [], value)),
      );
  }

  private _filter(options: T[], value: string): T[] {
    const filterValue = value ? value.toLowerCase() : '';
    return options.filter(option => this.toStringFn(option).toLowerCase().includes(filterValue));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const options = changes.options;
    if (options && options.currentValue && !options.currentValue.includes(this.formControl.value)) {
      this.formControl.setValue('');
    }
  }
}
