import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HandleAPIService } from '../../shared/services/handle-api.service';
import { InvoiceFull, SchoolSession, StudentClass, SchoolTerm } from '../../shared/models/invoice';
import { ToastrService } from 'ngx-toastr';
import { Company } from '../../shared/models/company';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.css']
})
export class PrintInvoiceComponent implements OnInit {
  id: any;
  invoice: InvoiceFull = new InvoiceFull();
  company: Company = new Company();
  ss: SchoolSession = new SchoolSession();
  sc: StudentClass = new StudentClass();
  st: SchoolTerm = new SchoolTerm();
  constructor(
      private route: ActivatedRoute,
      private handleAPI: HandleAPIService,
      private toastr: ToastrService,
      private authService: AuthService,
      private router: Router ) { }

  ngOnInit() {
    const tv = this.authService.isTokenValid();
    if (!tv) {
        this.router.navigate(['/login']);
        return;
    }
    this.id = this.route.snapshot.params['id'];
    this.getInvoice();
    console.log(this.invoice);
  }

  getInvoice() {
    this.handleAPI.getByID(this.id, 'api/Invoice')
      .subscribe( (data: any) => {
        // console.log(data);
          this.invoice = data;
          this.getCompany();
          this.getSSByID();
          this.getSCByID();
          this.getSTByID();
        },
        error => {
          if (typeof error === 'string') {
            this.toastr.warning(error, 'Oops! An error occurred');
          } else {
            this.toastr.warning('Please check the console.', 'Oops! An error occurred');
          }
        }
    );
  }
  getSSByID() {
    this.handleAPI.getByID(this.invoice.schoolSessionID, 'api/SchoolSession')
      .subscribe( (data: any) => {
        // console.log(data);
          this.ss = data;
        },
        error => {
          if (typeof error === 'string') {
            this.toastr.warning(error, 'Oops! An error occurred');
          } else {
            this.toastr.warning('Please check the console.', 'Oops! An error occurred');
          }
        }
    );
  }
  getSCByID() {
    this.handleAPI.getByID(this.invoice.studentClassID, 'api/StudentClass')
      .subscribe( (data: any) => {
        // console.log(data);
          this.sc = data;
        },
        error => {
          if (typeof error === 'string') {
            this.toastr.warning(error, 'Oops! An error occurred');
          } else {
            this.toastr.warning('Please check the console.', 'Oops! An error occurred');
          }
        }
    );
  }
  getSTByID() {
    this.handleAPI.getByID(this.invoice.schoolTermID, 'api/SchoolTerm')
      .subscribe( (data: any) => {
        // console.log(data);
          this.st = data;
        },
        error => {
          if (typeof error === 'string') {
            this.toastr.warning(error, 'Oops! An error occurred');
          } else {
            this.toastr.warning('Please check the console.', 'Oops! An error occurred');
          }
        }
    );
  }
  getCompany() {
    this.handleAPI.get('api/Company')
      .subscribe( (data: any) => {
        // console.log(data);
          this.company = data;
        },
        error => {
          if (error.object) {
            this.toastr.warning('Please check the console.', 'Oops! An error occurred');
          } else {
            this.toastr.warning(error, 'Oops! An error occurred');
          }
        }
    );
  }

}
