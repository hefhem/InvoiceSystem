import { Component, OnInit } from '@angular/core';
import * as decode from 'jwt-decode';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName: string;
  isAdmin: boolean;
  cls = 'd-none';
  constructor(private auth: AuthService, private router: Router) {
    // this.getUserRole();
    // if (this.auth.isAdmin()) {
    //   this.cls = '';
    // }
    // this.userName = this.auth.getUserName();
  }

  ngOnInit() {
    const tv = this.auth.isTokenValid();
    if (!tv) {
        this.router.navigate(['/login']);
        return;
    }
    // console.log(this.auth.isAdmin());
    if (this.auth.isAdmin()) {
      this.cls = '';
    }
    this.userName = this.auth.getUserName();
    // this.getUserRole();
  }

  logout() {
    this.auth.removeToken();
    this.router.navigate(['/login']);
    window.location.href = '/';
  }

  getUserRole() {
    if (!this.auth.isAdmin) {
      this.cls = 'd-none';
    }
    this.userName = this.auth.getUserName();
    // this.isAdmin = this.auth.isAdmin();
    // console.log(this.isAdmin);
  }

}
