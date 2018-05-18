import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Staff } from './staff.model';

@Injectable()
export class StaffService {
  selectedStaff: Staff;
  staffList: Staff[];

  constructor(private http: Http) { }

  postStaff(staff: Staff) {
    const body = JSON.stringify(staff);
    const headerOption = new Headers({'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOption});

    return this.http.post('http://localhost:49206/api/Staffs', body, requestOptions).map(x => x.json());
  }

  putStaff(id, staff: Staff) {
    const body = JSON.stringify(staff);
    const headerOption = new Headers({'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Put, headers: headerOption});

    return this.http.post('http://localhost:49206/api/Staffs/' + id, body, requestOptions)
    .map(x => x.json());
  }

  deleteStaff(id: number) {
    return this.http.delete('http://localhost:49206/api/Staffs/' + id).map(x => x.json());
  }

  getStaffList() {
    this.http.get('http://localhost:49206/api/Staffs')
    .map((data: Response) => {
      return data.json() as Staff[];
    }).toPromise().then( x => {
      this.staffList = x;
    });
  }


}
