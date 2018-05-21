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
  account = {
    userName: '',
    password: ''
  };
  constructor(
    private router: Router,
    private auth: AuthService,
    private toast: ToastrService  ) { }

  ngOnInit() {
  }

  doLogin() {
    this.auth.login(this.account).subscribe(
      data => {
        // console.log(data);
        this.auth.saveInLocal('token', data);
        this.auth.getUserRole();
        this.toast.success('Authenticated!');
        this.router.navigate(['']);
      },
      error => {
        this.toast.error(error);
      }
    );

  }
}
