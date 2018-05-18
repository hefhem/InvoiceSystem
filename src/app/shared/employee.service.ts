import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {

  selectedEmployee: Employee;
  employeeList: Employee[];

  constructor(private http: Http) { }

  postEmployee(emp: Employee) {
    const body = JSON.stringify(emp);
    const headerOption = new Headers({'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOption});

    return this.http.post('http://localhost:49206/api/Employees', body, requestOptions).map(x => x.json());
  }

  putEmployee(id, emp: Employee) {
    const body = JSON.stringify(emp);
    const headerOption = new Headers({'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Put, headers: headerOption});

    return this.http.post('http://localhost:49206/api/Employees/' + id, body, requestOptions)
    .map(x => x.json());
  }

  deleteEmployee(id: number) {
    return this.http.delete('http://localhost:49206/api/Employees/' + id).map(x => x.json());
  }

  getEmployeeList() {
    this.http.get('http://localhost:49206/api/Employees')
    .map((data: Response) => {
      return data.json() as Employee[];
    }).toPromise().then( x => {
      this.employeeList = x;
    });
  }

}
