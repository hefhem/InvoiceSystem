import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Company } from '../../shared/models/company';
import { HandleAPIService } from '../../shared/services/handle-api.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  company: Company = new Company();
  endpoint = 'api/Company';
  tokenData: any;
  userID: any;

  constructor(
    private handleAPI: HandleAPIService,
    private toastr: ToastrService,
    private authService: AuthService,
  private router: Router) { }

  ngOnInit() {
    const tv = this.authService.isTokenValid();
    if (!tv) {
        this.router.navigate(['/login']);
    }
    if (!this.authService.isAdmin()) {
      // this.toastr.warning('', 'Access Denied!');
      // this.router.navigate(['']);
        return;
    }
    this.userID = this.authService.getUserID();
    this.getCompany();
  }

  onAdd() {
    this.company.createdByID = this.userID;
    this.handleAPI.update(this.company, this.endpoint)
      .subscribe( data => {
          this.toastr.success('Company Updated!', 'Success');
          this.company = new Company();
          this.getCompany();
        },
        error => {
          if (error.object) {
            this.toastr.warning('Please check the console.', 'Oops! An error occurred');
          } else {
            this.toastr.warning(error, 'Oops! An error occurred');
          }
        }
      );
  }
  getCompany() {
    this.company = new Company();
    this.handleAPI.get(this.endpoint)
      .subscribe( (data: any) => {
        // console.log(data);
          this.company = data;
        },
        error => {
          if (error.object) {
            this.toastr.warning('Please check the console.', 'Oops! An error occurred');
          } else {
            this.toastr.warning(error, 'Oops! An error occurred');
          }
        }
    );
  }
}

