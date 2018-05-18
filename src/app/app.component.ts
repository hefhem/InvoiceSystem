import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import * as decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  td: any;
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
    const token = this.authService.getFromLocal('token');
    if (token) {
      this.td = decode(token);
      console.log(this.td);
      const current_time = new Date().getTime() / 1000;
      if (!(current_time > this.td.exp)) {
        this.route.navigate(['']);
      } else {
        this.route.navigate(['/login']);
      }
    } else {
      this.route.navigate(['/login']);
    }

  }

}
