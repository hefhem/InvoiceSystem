import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  disabled = false;
  signin = 'Sign In';
  currentDate = new Date().getFullYear();
  account = {
    userName: '',
    password: ''
  };
  constructor(
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService  ) { }

  ngOnInit() {
    const tv = this.auth.isTokenValid();
    if (tv) {
        this.router.navigate(['']);
        return;
    }
  }

  doLogin() {
    this.signin = 'Loading';
    this.disabled = true;
    this.auth.login(this.account).subscribe(
      (data: any ) => {
        // console.log(data);
        if (data.isSuccess) {
          this.auth.saveInLocal('token', data.message);
          this.auth.saveInLocal('id', data.id);
          this.auth.saveInLocal('isAdmin', data.isAdmin);
          this.toastr.success('Authenticated!');
          // window.location.href = '';
          this.router.navigate(['']);
        } else {
          if (data.message === 'reset') {
            this.toastr.success('Reset your password!');
            this.router.navigate(['/reset-password', data.id]);
          }
        }
      },
      error => {
        if (typeof error === 'string') {
          this.toastr.error(error, 'Oops! An error occurred');
        } else {
          this.toastr.error('Please check the console.', 'Oops! An error occurred');
        }
        this.signin = 'Sign In';
        this.disabled = false;
      }
    );

  }
}
