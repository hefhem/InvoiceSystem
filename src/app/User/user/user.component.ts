import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const tv = this.authService.isTokenValid();
    if (!tv) {
        this.router.navigate(['/login']);
        return;
    }
    if (!this.authService.isAdmin()) {
      this.toastr.warning('', 'Access Denied!');
      // this.router.navigate(['']);
        return;
    }
  }

}
