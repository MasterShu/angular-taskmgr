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
import { Subscription } from 'rxjs/Subscription';
import { IdentityType, Identity } from '../../domain/index';
import { Subject } from 'rxjs/Subject';
import { IdentityType } from '../../domain/user.model';

@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: ['./identity-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentityInputComponent implements OnInit, ControlValueAccessor, OnDestroy {

  identityTypes = [
    { value: IdentityType.IdCard, label: '身份证' },
    { value: IdentityType.Insurance, label: '医保' },
    { value: IdentityType.Passport, label: '护照' },
    { value: IdentityType.Military, label: '军官证' },
    { value: IdentityType.Other, label: '其他' }
  ];
  identity: Identity = {identityType: null, identityNo: null};

  sub: Subscription;
  private _idType = new Subject<IdentityType>();
  private _idNo = new Subject<string>();

  private propagateChange = (_: any) => { };

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const val$ = Observable.combineLatest(this.idNo, this.idType, (_no, _type) => {
      return {
        identityType: _type,
        identityNo: _no
      };
    });
    this.sub = val$.subscribe(id => {
      this.propagateChange(id);
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  writeValue(obj: any): void {
    if (obj) {
      this.identity = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  onIdTypeChange(idType: IdentityType) {
    this._idType.next(idType);
  }

  onIdNoChange(idNo: string) {
    this._idNo.next(idNo);
  }

  get idType(): Observable<IdentityType> {
    return this._idType.asObservable();
  }
  get idNo(): Observable<string> {
    return this._idNo.asObservable();
  }

  validate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    if (!val) {
      return null;
    }
    switch (val.identityType) {
      case IdentityType.IdCard:
        return this.validateIdCard();
      case IdentityType.Passport:
        return this.validatePassport();
      case IdentityType.Military:
        return this.validateMilitary();
      case IdentityType.Insurance:
      default: {
        return null;
      }
    }
  }

  validateIdCard(c: FormControl): { [key: string]: any } {
    const val = c.value;
    if (val.length !== 18) {
      return {idInvalid: true };
    }
    const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
  }



}
