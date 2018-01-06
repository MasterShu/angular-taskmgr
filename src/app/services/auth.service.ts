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
  /**
   * 使用用户提供的个人信息进行注册，成功则返回 User，否则抛出异常
   *
   * @param user 用户信息，id 属性会被忽略，因为服务器端会创建新的 id
   */
  register(user: User): Observable<Auth> {
    const uri = `${this.config.uri}/users`;
    return this.http
      .get(uri, { params: { 'email': user.email } })
      .switchMap(res => {
        if (res.json().length > 0) {
          throw 'username existed';
        }
        return this.http.post(uri, JSON.stringify(user), { headers: this.headers })
          .map(r => ({ token: this.token, user: r.json() }));
      });
  }

  /**
   * 使用用户名和密码登录
   *
   * @param username 用户名
   * @param password 密码（明文），服务器会进行加密处理
   */
  login(email: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/users`;
    return this.http
      .get(uri, { params: { 'email': email, 'password': password } })
      .map(res => {
        if (res.json().length === 0) {
          throw 'Login Failed';
        }
        return {
          token: this.token,
          user: res.json()[0]
        };
      });
  }

}
