import { NgModule } from '@angular/core';
import { StoreModule, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { StoreRouterConnectingModule  } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromQuote from './quote.reducer';
import * as fromAuth from './auth.reducer';
import { environment } from '../../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { createSelector } from '@ngrx/store/src/selector';
import { Auth } from '../domain/index';


export interface State {
  quote: fromQuote.State;
  auth: Auth;
}

const initialState: State = {
  quote: fromQuote.initialState,
  auth: fromAuth
};

export const reducers: ActionReducerMap<State> = {
  quote: fromQuote.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];

export const getQuoteState = (state: State) => state.quote;
export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);

export const getAuthState = (state: State) => state.auth;

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
    // StoreRouterConnectingModule,

  ]
})
export class AppStoreModule {}

