import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Project, User } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  private readonly domain = 'users';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {

  }
  searchUsers(filter: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: new HttpParams().set('email_like', filter) })
      .map(res => res as User[]);
  }

  getUserByProject(projectId: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: new HttpParams().set('projectId', projectId) })
      .map(res => res as User[]);
  }

  addProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    if (projectIds.indexOf(projectId) > -1) {
      return Observable.of(user);
    }
    return this.http
      .patch(uri, JSON.stringify({projectIds: [...projectIds, projectId]}), {headers: this.headers})
      .map(res => res as User);
  }

  removeProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    const index = projectIds.indexOf(projectId);
    if (index === -1) {
      return Observable.of(user);
    }
    const toUpdate = [...projectIds.slice(0, index), ...projectIds.slice(index + 1)];
    return this.http
      .patch(uri, JSON.stringify({ projectIds: toUpdate }), { headers: this.headers })
      .map(res => res as User);
  }

  batchUpdateProjectRef(project: Project): Observable<User[]> {
    const projectId = project.id;
    const memberIds = project.members;
    return Observable.from(memberIds)
      .switchMap(id => {
        const uri = `${this.config.uri}/${this.domain}/${id}`;
        return this.http.get(uri).map(res => res as User);
      })
      .filter(user => user.projectIds.indexOf(projectId) === -1)
      .switchMap(u => this.addProjectRef(u, projectId))
      .reduce((arr, cuur) => [...arr, cuur], []);
  }
}
