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
  currentDate = new Date().getFullYear();
  account = {
    userName: '',
    password: ''
  };
  constructor(
    private router: Router,
    private auth: AuthService,
    private toast: ToastrService  ) { }

  ngOnInit() {
    const tv = this.auth.isTokenValid();
    if (tv) {
        this.router.navigate(['']);
        return;
    }
  }

  doLogin() {
    this.auth.login(this.account).subscribe(
      (data: any ) => {
        // console.log(data);
        if (data.isSuccess) {
          this.auth.saveInLocal('token', data.message);
          this.auth.saveInLocal('id', data.id);
          this.auth.saveInLocal('isAdmin', data.isAdmin);
          this.toast.success('Authenticated!');
          // window.location.href = '';
          this.router.navigate(['']);
        } else {
          if (data.message === 'reset') {
            this.toast.success('Reset your password!');
            this.router.navigate(['/reset-password', data.id]);
          }
        }
      },
      error => {
        this.toast.error(error);
      }
    );

  }
}
