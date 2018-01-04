import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Project } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService {

  private readonly domain = 'projects';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private  http: HttpClient, @Inject('BASE_CONFIG') private config) {

  }

  // POST
  add(project: Project): Observable<Project> {
    project.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(project), {headers: this.headers})
      .map(res => res as Project);
  }

  // PUT
  update(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg
    };
    return this.http
      .patch(uri, JSON.stringify(toUpdate), { headers: this.headers })
      .map(res => res as Project);
  }
  // DELETE
  del(project: Project): Observable<Project> {
    const delTasks$ = Observable.from(project.taskList ? project.taskList : [])
      .mergeMap(listId => this.http.delete(`${this.config.uri}/taskList/${listId}`))
      .count();

    return delTasks$.switchMap(_ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`))
      .mapTo(project);
  }

  // GET
  get(userId: string): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: new HttpParams().set('members_like', userId)})
      .map(res => res as Project);
  }
}
