import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.css']
})
export class UserPermissionComponent implements OnInit {

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
      // this.toastr.warning('', 'Access Denied!');
      // this.router.navigate(['']);
        return;
    }
  }

}
