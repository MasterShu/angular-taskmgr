import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TaskList } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskListService {

  private readonly domain = 'taskLists';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private  http: HttpClient, @Inject('BASE_CONFIG') private config) {

  }

  // POST
  add(taskList: TaskList): Observable<TaskList> {
    taskList.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(taskList), {headers: this.headers})
      .map(res => res as TaskList);
  }

  // PUT
  update(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    const toUpdate = {
      name: taskList.name
    };
    return this.http
      .patch(uri, JSON.stringify(toUpdate), { headers: this.headers })
      .map(res => res as TaskList);
  }
  // DELETE
  del(taskList: TaskList): Observable<TaskList> {
    const uri = `${ this.config.uri } /${this.domain}/${ taskList.id }`;
    return this.http.delete(uri)
      .mapTo(taskList);
  }

  // GET
  get(projectId: string): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: new HttpParams().set('projectId', projectId)})
      .map(res => res as TaskList);
  }

  swapOrder(src: TaskList, target: TaskList): Observable<TaskList> {
    const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
    const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
    const drag$ = this.http
      .patch(dragUri, JSON.stringify({order: target.order}), {headers: this.headers})
      .map(res => res.json());
    const drop$ = this.http
      .patch(dropUri, JSON.stringify({ order: src.order }), { headers: this.headers })
      .map(res => res.json());
    return Observable
      .concat(drag$, drop$)
      .reduce((arrs, list) => [...arrs, list], []);
  }
}
