import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  account = {
    userName: '',
    password: ''
  };
  constructor(private router: Router, private auth: AuthService, private toast: ToastrService ) { }

  ngOnInit() {
  }

  doLogin() {
    this.auth.login(this.account).subscribe(
      data => {
        // console.log(data);
        this.auth.saveInLocal('token', data);
        this.router.navigate(['']);
      },
      error => {
        this.toast.error(error);
      }
    );
  }

}
