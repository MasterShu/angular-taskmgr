import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

declare module 'rxjs/Observable' {
  // tslint:disable-next-line:no-shadowed-variable
  interface Observable<T> {
    debug: (...any) => Observable<T>;
  }
}

Observable.prototype.debug = function(message: string) {
  return this.do(
    (next) => {
      if (!environment.production) {
        console.log(message, next);
      }
    },
    (err) => {
      if (!environment.production) {
        console.log('ERROR>> ', message, err);
      }
    },
    () => {
      if (!environment.production) {
        console.log('Completed - ');
      }
    }
  );
}
