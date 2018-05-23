import 'rxjs/add/operator/toPromise';

import { Injectable, Inject } from '@angular/core';

import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';

@Injectable()
export class HandleAPIService {

  constructor(private api: ApiService, private authService: AuthService) { }

  create(comp: any, url: string) {
    const token = this.authService.getFromLocal('token');
    const headerOption = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'bearer ' + token
    });
    const httpOptions = {
      // headers: new HttpHeaders({ 'Content-Type': 'application/json' }) text/plain
      headers: headerOption
    };
    const body = JSON.stringify(comp);
    // const requestOptions = new HttpRequest(({method: RequestMethod.Post, headers: headerOption});
    const seq = this.api.post(url, body, httpOptions);

    return seq;
  }

  update(comp: any, url: string) {
    const token = this.authService.getFromLocal('token');
    const headerOption = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'bearer ' + token
    });
    const httpOptions = {
      // headers: new HttpHeaders({ 'Content-Type': 'application/json' }) text/plain
      headers: headerOption
    };
    const body = JSON.stringify(comp);
    // const requestOptions = new HttpRequest(({method: RequestMethod.Post, headers: headerOption});
    const seq = this.api.put(url, body, httpOptions);

    return seq;
  }

  get(url: string) {
    const token = this.authService.getFromLocal('token');
    const headerOption = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'bearer ' + token
    });
    const httpOptions = {
      // headers: new HttpHeaders({ 'Content-Type': 'application/json' }) text/plain
      headers: headerOption
    };
    const body = '';
    // const requestOptions = new HttpRequest(({method: RequestMethod.Post, headers: headerOption});
    const seq = this.api.get(url, body, httpOptions);

    return seq;
  }

  getByID(id: number, url: string) {
    const token = this.authService.getFromLocal('token');
    const headerOption = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'bearer ' + token
    });
    const httpOptions = {
      // headers: new HttpHeaders({ 'Content-Type': 'application/json' }) text/plain
      headers: headerOption
    };
    const body = '';
    // const requestOptions = new HttpRequest(({method: RequestMethod.Post, headers: headerOption});
    const seq = this.api.get(url + '/' + id, body, httpOptions);

    return seq;
  }

  delete(id: number, url: string) {
    const token = this.authService.getFromLocal('token');
    const headerOption = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'bearer ' + token
    });
    const httpOptions = {
      // headers: new HttpHeaders({ 'Content-Type': 'application/json' }) text/plain
      headers: headerOption
    };
    const body = '';
    // const requestOptions = new HttpRequest(({method: RequestMethod.Post, headers: headerOption});
    const seq = this.api.delete(url + '/' + id, httpOptions);

    return seq;
  }

  deleteWithUserID(id: number, url: string, userID: number) {
    const token = this.authService.getFromLocal('token');
    const headerOption = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'bearer ' + token
    });
    const httpOptions = {
      // headers: new HttpHeaders({ 'Content-Type': 'application/json' }) text/plain
      headers: headerOption
    };
    const body = '';
    // const requestOptions = new HttpRequest(({method: RequestMethod.Post, headers: headerOption});
    const seq = this.api.delete(url + '/' + id + '?userID=' + userID, httpOptions);

    return seq;
  }

}
