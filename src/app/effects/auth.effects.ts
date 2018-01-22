import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import * as actions from '../actions/auth.action';
import { AuthService } from '../services/auth.service';
import { User } from '../domain/index';

@Injectable()
export class QuoteEffects {
  @Effect() login$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN)
    .map(toPayload)
    .switchMap(({email, password}) => this.service$.login(email, password)
      .map(auth => new actions.LoginSuccessAction(auth))
      .catch(err => Observable.of(new actions.LoginFailAction(JSON.stringify(err))))
    );

  @Effect() register$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.REGISTER)
    .map(toPayload)
    .switchMap((u: User) => this.service$.register(u)
      .map(auth => new actions.RegisterSuccessAction(auth))
      .catch(err => Observable.of(new actions.RegisterFailAction(JSON.stringify(err))))
    );

  @Effect() logout$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGOUT)
    .map(() => go(['/']))
    ;

  constructor(
    private actions$: Actions,
    private service$: AuthService
  ) { }
}
