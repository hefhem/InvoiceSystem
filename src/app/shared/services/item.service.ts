import 'rxjs/add/operator/toPromise';

import { Injectable, Inject } from '@angular/core';

import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';

@Injectable()
export class ItemService {

  constructor(private api: ApiService, private authService: AuthService) { }

  createItem(comp: any) {
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
    const seq = this.api.post('api/Item', body, httpOptions);

    return seq;
  }

  updateItem(comp: any) {
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
    const seq = this.api.put('api/Item', body, httpOptions);

    return seq;
  }

  getItem() {
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
    const seq = this.api.get('api/Item', body, httpOptions);

    return seq;
  }

  getItemByID(id: number) {
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
    const seq = this.api.get('api/Item/' + id, body, httpOptions);

    return seq;
  }

  deleteItem(id: number) {
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
    const seq = this.api.delete('api/Item/' + id, httpOptions);

    return seq;
  }

}
