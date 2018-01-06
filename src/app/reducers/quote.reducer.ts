import * as actions from '../actions/quote.action';
import { Quote } from '../domain/index';

export interface State {
  quote: Quote;
}

export const initialState: State = {
  quote: {
    cn: '奔跑吧, 骚年...',
    en: 'run baby...',
    pic: 'assets/img/quote_fallback.jpg'
  }
};

export function reducer(state = initialState, action: actions.Actions ): State {
  switch (action.type) {
    case actions.ActionTypes.LOAD_SUCCESS: {
      return {
        ...state, quote: <Quote>action.payload
      };
    }
    case actions.ActionTypes.LOAD_FAIL:

    default: {
      return state;
    }
  }
}

export const getQuote = (state: State) => state.quote;
