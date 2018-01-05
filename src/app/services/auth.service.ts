import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Project, User, Auth } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private readonly domain = 'users';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  .eyJpc3MiOiJuaW5naGFvLm5ldCIsImV4cCI6IjE0Mzg5NTU0NDUiLCJuYW1lIjoid2FuZ2hhbyIsImFkbWluIjp0cnVlfQ
  .SwyHTEx_RQppr97g4J5lKXtabJecpejuef8AqKYMAJc`;

  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {

  }
  register(user: User): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    user.id = null;
    return this.http
      .get(uri, { params: new HttpParams().set('email', user.email)})
      .switchMap(res => {
        if (res.json().length > 0) {
          throw 'user existed';
        }
        return this.http
          .post(uri, JSON.stringify(user), {headers: this.headers})
          .map(r => ({token: this.token, user: r.json()}))
      });
  }

  login(username: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: new HttpParams().set('email', username).set( 'password', password) })
      .map(res => {
        if (res.json().length === 0) {
          throw 'username or password not match';
        }
        return {
          token: this.token,
          user: res.json()[0]
        };
      });
  }

}
