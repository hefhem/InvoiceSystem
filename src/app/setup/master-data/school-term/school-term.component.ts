import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HandleAPIService } from '../../../shared/services/handle-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { SchoolTerm } from '../../../shared/models/invoice';

@Component({
  selector: 'app-school-term',
  templateUrl: './school-term.component.html',
  styleUrls: ['./school-term.component.css']
})
export class SchoolTermComponent implements OnInit {
  schoolTerm: SchoolTerm = new SchoolTerm();
  schoolTerms: SchoolTerm[] = [];
  endpoint = 'api/SchoolTerm';
  tokenData: any;
  userID: any;

  constructor(
    private handleAPI: HandleAPIService,
    private toastr: ToastrService,
    private authService: AuthService,
  private route: Router) { }

  ngOnInit() {
    const tv = this.authService.isTokenValid();
    if (!tv) {
        this.route.navigate(['/login']);
    }
    this.userID = this.authService.getUserID();
    this.getSchoolTerms();
  }

  onAdd() {
    this.schoolTerm.createdByID = this.userID;
    if (this.schoolTerm.schoolTermID === 0) {
      this.handleAPI.create(this.schoolTerm, this.endpoint)
        .subscribe( data => {
            this.toastr.success('School Term added!', 'Success');
            this.schoolTerm = new SchoolTerm();
            this.getSchoolTerms();
          },
          error => {
            if (error.object) {
              this.toastr.warning('Please check the console.', 'Oops! An error occurred');
            } else {
              this.toastr.warning(error, 'Oops! An error occurred');
            }
          }
        );
    } else {
      this.handleAPI.update(this.schoolTerm, this.endpoint)
        .subscribe( data => {
            this.toastr.success('School Term Updated!', 'Success');
            this.schoolTerm = new SchoolTerm();
            this.getSchoolTerms();
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
  showForEdit(schoolTerm: any) {
    this.handleAPI.getByID(schoolTerm.schoolTermID, this.endpoint)
      .subscribe( (data: any) => {
          this.schoolTerm = data;
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

  removeSchoolTerm(schoolTerm: any) {
    if (confirm('Are you sure you want to delete this schoolTerm?')) {
      this.handleAPI.delete(schoolTerm.schoolTermID, this.endpoint)
        .subscribe( data => {
            this.toastr.success('School Term removed', 'Success');
            this.getSchoolTerms();
            console.log(data);
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
  getSchoolTerms() {
    this.schoolTerm = new SchoolTerm();
    this.handleAPI.get(this.endpoint)
      .subscribe( (data: any) => {
        // console.log(data);
          this.schoolTerms = data;
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

