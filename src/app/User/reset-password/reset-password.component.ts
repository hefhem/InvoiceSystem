import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HandleAPIService } from '../../shared/services/handle-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  confirmPassword: string;
  account = {
    userID: 0,
    newPassword: '',
    oldPassword: ''
  };
  constructor(
    private route: ActivatedRoute,
    private handleAPI: HandleAPIService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.account.userID = this.route.snapshot.params['id'];
  }

  resetPassword() {
    if (this.account.newPassword !== this.confirmPassword) {
      this.toastr.warning('New password and confirm password not the same', 'Oops! An error occurred');
    } else {
      this.handleAPI.update(this.account, 'api/Users/ResetPassword')
        .subscribe( data => {
            this.toastr.success('Password reset successful!', 'Success');
            this.router.navigate(['/login']);
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
