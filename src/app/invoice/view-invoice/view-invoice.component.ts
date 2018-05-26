import { Component, OnInit } from '@angular/core';
import { InvoiceDetail, Invoice } from '../../shared/models/invoice';
import { HandleAPIService } from '../../shared/services/handle-api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Subject } from 'rxjs';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  endpoint = 'api/Invoice';
  InvoiceArray: Invoice[] = [];
  userID: any;
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private handleAPI: HandleAPIService,
    private toastr: ToastrService,
    private router: Router,
  private auth: AuthService) { }

  ngOnInit() {
    const tv = this.auth.isTokenValid();
    if (!tv) {
        this.router.navigate(['/login']);
        return;
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.userID = this.auth.getUserID();
    this.getInvoices();
  }

  getInvoices() {
    this.InvoiceArray = [];
    this.handleAPI.get(this.endpoint)
      .subscribe( (data: any) => {
          // console.log(data);
          this.InvoiceArray = data;
          this.dtTrigger.next();
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

  printInvoice(id: any) {
    console.log(id);
    this.router.navigate(['/print-invoice', id]);
  }

  reverseInvoice(inv: Invoice) {
    if (confirm('Are you sure you want to cancel this Invoice ' + inv.invoiceNumber + ' ?')) {
      this.handleAPI.deleteWithUserID(inv.invoiceMasterID, 'api/Invoice', this.userID )
        .subscribe( data => {
            this.toastr.success('Invoice cancelled', 'Success');
            this.getInvoices();
            // console.log(data);
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

}
