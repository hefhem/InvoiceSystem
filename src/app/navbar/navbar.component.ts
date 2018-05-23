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
  admin: string;
  constructor(private auth: AuthService, private router: Router) {
    this.getUserRole();
  }

  ngOnInit() {
    this.getUserRole();
  }

  logout() {
    this.auth.removeToken();
    this.router.navigate(['/login']);
  }

  getUserRole() {
    this.userName = this.auth.getUserName();
    this.admin = this.auth.getFromLocal('isAdmin');
    // console.log(admin);
    this.isAdmin = this.admin !== 'Y' ? false : true;
    // console.log(this.isAdmin);
  }

}
