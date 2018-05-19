import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StudentClass } from '../../../shared/models/invoice';
import { HandleAPIService } from '../../../shared/services/handle-api.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-student-class',
  templateUrl: './student-class.component.html',
  styleUrls: ['./student-class.component.css']
})
export class StudentClassComponent implements OnInit {
  studentClass: StudentClass = new StudentClass();
  studentClasses: StudentClass[] = [];
  endpoint = 'api/StudentClass';
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
    this.getStudentClass();
  }

  onAdd() {
    this.studentClass.createdByID = this.userID;
    if (this.studentClass.studentClassID === 0) {
      this.handleAPI.create(this.studentClass, this.endpoint)
        .subscribe( data => {
            this.toastr.success('Student Class added!', 'Success');
            this.studentClass = new StudentClass();
            this.getStudentClass();
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
      this.handleAPI.update(this.studentClass, this.endpoint)
        .subscribe( data => {
            this.toastr.success('Student Class Updated!', 'Success');
            this.studentClass = new StudentClass();
            this.getStudentClass();
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
  showForEdit(studentClass: any) {
    this.handleAPI.getByID(studentClass.studentClassID, this.endpoint)
      .subscribe( (data: any) => {
          this.studentClass = data;
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

  removeStudentClass(studentClass: any) {
    if (confirm('Are you sure you want to delete this studentClass?')) {
      this.handleAPI.delete(studentClass.studentClassID, this.endpoint)
        .subscribe( data => {
            this.toastr.success('Student Class removed', 'Success');
            this.getStudentClass();
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
  getStudentClass() {
    this.studentClass = new StudentClass();
    this.handleAPI.get(this.endpoint)
      .subscribe( (data: any) => {
        // console.log(data);
          this.studentClasses = data;
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

