import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';
import { HandleAPIService } from '../../shared/services/handle-api.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  user: User = new User();
  users: User[] = [];
  endpoint = 'api/Users';
  tokenData: any;
  userID: any;
  btn = 'Add';

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
    this.getUsers();
  }

  onAdd() {
    this.user.createdByID = this.userID;
    if (this.user.userID === 0) {
      this.handleAPI.create(this.user, this.endpoint)
        .subscribe( data => {
            this.toastr.success('User added!', 'Success');
            this.user = new User();
            this.btn = 'Add';
            this.getUsers();
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
      this.handleAPI.update(this.user, this.endpoint)
        .subscribe( data => {
            this.toastr.success('User Updated!', 'Success');
            this.user = new User();
            this.getUsers();
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
  showForEdit(user: any) {
    this.btn = 'Update';
    this.handleAPI.getByID(user.userID, this.endpoint)
      .subscribe( (data: any) => {
          this.user = data;
          // console.log(data);
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

  removeUser(user: any) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.handleAPI.delete(user.userID, this.endpoint)
        .subscribe( data => {
            this.toastr.success('User removed', 'Success');
            this.getUsers();
            // console.log(data);
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
  getUsers() {
    this.user = new User();
    this.btn = 'Add';
    this.handleAPI.get(this.endpoint)
      .subscribe( (data: any) => {
        // console.log(data);
          this.users = data;
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


