import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Quote } from '../../domain/quote.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers/index';
import * as actions from '../../actions/quote.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  quote$: Observable<Quote>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromRoot.State>
  ) {
    this.quote$ = this.store$.select(fromRoot.getQuote);
    this.store$.dispatch(new actions.LoadAction(null));
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['test@qq.com', Validators.compose([Validators.required, Validators.email, this.validate])],
      password: ['', Validators.required],
    });
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(JSON.stringify(valid));
  }

  validate(c: FormControl): {[key: string]: any} {
    if (!c.value) {
      return null;
    }
    const pattern = /^test+/;
    if (pattern.test(c.value)) {
      return null;
    }
    return {
      emailNotValid: 'The email must start with test'
    };
  }
}
