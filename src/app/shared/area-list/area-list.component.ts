import { Component, OnInit, Input, forwardRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {
  parse,
  isBefore,
  subDays,
  differenceInDays,
  subMonths,
  differenceInMonths,
  differenceInYears,
  format,
  subYears,
  isValid,
  isDate,
  isFuture
} from 'date-fns';
import { isValidDate } from '../../utils/date.util';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaListComponent implements OnInit, ControlValueAccessor, OnDestroy {

  sub: Subscription;
  private propagateChange = (_: any) => { };

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  writeValue(obj: any): void {
    if (obj) {
      const date = format(obj, this.format);
      this.form.get('birthday').patchValue(format(obj, this.format));
      const age = this.toAge(date);
      this.form.get('age').get('ageNum').patchValue(age.age);
      this.form.get('age').get('ageUnit').patchValue(age.unit);
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  validate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (!isValidDate(val)) {
      return null;
    }
    return {
      dateOfBirthInvalid: true
    };
  }
}
