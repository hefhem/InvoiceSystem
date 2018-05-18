import 'rxjs/add/operator/toPromise';

import { Injectable, Inject } from '@angular/core';

import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import * as decode from 'jwt-decode';
import {SESSION_STORAGE, LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Injectable()
export class AuthService {
    tokenData: any;
    constructor( @Inject(SESSION_STORAGE) private storage: WebStorageService, private api: ApiService) { }

    login(accountInfo: any) {
      const httpOptions = {
        // headers: new HttpHeaders({ 'Content-Type': 'application/json' }) text/plain
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
      const body = JSON.stringify(accountInfo);
      // const requestOptions = new HttpRequest(({method: RequestMethod.Post, headers: headerOption});
      const seq = this.api.post('token', body, httpOptions);
      return seq;
    }
    removeToken() {
      this.storage.remove('token');
    }
    saveInLocal(key, val): void {
        // console.log('recieved= key:' + key + 'value:' + val);
        this.storage.set(key, val);
      }
    getFromLocal(key): string {
      // console.log('recieved= key:' + key);
      return this.storage.get(key);
      // console.log(this.data);
    }
    decodeToken() {
      const tk = this.getFromLocal('token');
      this.tokenData = decode(tk);
      return this.tokenData;
    }
}
