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
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.userName = this.auth.getUserName();
  }

  logout() {
    this.auth.removeToken();
    this.router.navigate(['/login']);
  }

}
