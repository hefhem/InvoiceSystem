import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HandleAPIService } from '../../shared/services/handle-api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  confirmPassword: string;
  userName: string;
  account = {
    userID: 0,
    newPassword: '',
    oldPassword: ''
  };
  constructor(
    private route: ActivatedRoute,
    private handleAPI: HandleAPIService,
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    const tv = this.auth.isTokenValid();
    if (!tv) {
        this.router.navigate(['/login']);
        return;
    }
    this.account.userID = this.auth.getUserID();
    this.userName = this.auth.getUserName();
  }

  changeUserPassword() {
    if (this.account.newPassword !== this.confirmPassword) {
      this.toastr.warning('New password and confirm password not the same', 'Oops! An error occurred');
    } else {
      this.handleAPI.update(this.account, 'api/Users/ChangePassword')
        .subscribe( data => {
            this.toastr.success('Password change successful!', 'Success');
          },
          error => {
            if (typeof error === 'string') {
              this.toastr.warning(error, 'Oops! An error occurred');
            } else {
              this.toastr.warning('Please check the console.', 'Oops! An error occurred');
            }
        }
      );
    }
  }
}
