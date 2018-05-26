import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SchoolSession } from '../../../shared/models/invoice';
import { HandleAPIService } from '../../../shared/services/handle-api.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-school-session',
  templateUrl: './school-session.component.html',
  styleUrls: ['./school-session.component.css']
})
export class SchoolSessionComponent implements OnInit {
  schoolSession: SchoolSession = new SchoolSession();
  schoolSessions: SchoolSession[] = [];
  endpoint = 'api/SchoolSession';
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
    this.getSchoolSessions();
  }

  onAdd() {
    this.schoolSession.createdByID = this.userID;
    if (this.schoolSession.schoolSessionID === 0) {
      this.handleAPI.create(this.schoolSession, this.endpoint)
        .subscribe( data => {
            this.toastr.success('SchoolSession added!', 'Success');
            this.schoolSession = new SchoolSession();
            this.getSchoolSessions();
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
      this.handleAPI.update(this.schoolSession, this.endpoint)
        .subscribe( data => {
            this.toastr.success('SchoolSession Updated!', 'Success');
            this.schoolSession = new SchoolSession();
            this.getSchoolSessions();
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
  showForEdit(schoolSession: any) {
    this.handleAPI.getByID(schoolSession.schoolSessionID, this.endpoint)
      .subscribe( (data: any) => {
          this.schoolSession = data;
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

  removeSchoolSession(schoolSession: any) {
    if (confirm('Are you sure you want to delete this schoolSession?')) {
      this.handleAPI.delete(schoolSession.schoolSessionID, this.endpoint)
        .subscribe( data => {
            this.toastr.success('SchoolSession removed', 'Success');
            this.getSchoolSessions();
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
  getSchoolSessions() {
    this.schoolSession = new SchoolSession();
    this.handleAPI.get(this.endpoint)
      .subscribe( (data: any) => {
        // console.log(data);
          this.schoolSessions = data;
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
