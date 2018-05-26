import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Invoice, InvoiceDetail, InvoiceFull, PriceListView, PriceList } from '../shared/models/invoice';
import { HandleAPIService } from '../shared/services/handle-api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent implements OnInit {
  invoiceTotal = 0;
  invoiceDiscount = 0;
  invoiceTotalBeforeDiscount = 0;
  invoice = new Invoice();
  invoiceDetail = new InvoiceDetail();
  invoiceFull: InvoiceFull = new InvoiceFull();
  formReady = false;
  print = false;
  invID = 0;
  cd = new Date();
  // = {
  //   InvoiceID: 0, ItemCode: '', ItemName: '', Qty: 0, UnitPrice: 0, LineTotal: 0
  // };
  InvoiceArray: InvoiceDetail[] = [];

  items = [];
  studentClass = [];
  schoolTerm = [];
  schoolSession = [];
  priceList: PriceList[] = [];
  endpoint = 'api/Invoice';
  tokenData: any;
  userID: any;
  enableCls = false;
  enableTerm = false;
  enableItem = false;

  constructor(
    private handleAPI: HandleAPIService,
    private toastr: ToastrService,
    private auth: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
    const tv = this.auth.isTokenValid();
    if (!tv) {
        this.route.navigate(['/login']);
    }
    this.userID = this.auth.getUserID();
    this.getSchoolSessions();
    this.getItems();
    this.getSchoolTerms();
    this.getStudentClass();
    this.getPriceLists();
  }
  onChange(itm: string) {
    if (itm === 'class') {
      this.enableCls = true;
    }
    if (itm === 'term') {
      this.enableTerm = true;
    }
    if (itm === 'item') {
      this.enableItem = true;
    }
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
      this.InvoiceArray = [];
      this.invoiceTotal = 0;
      this.invoiceTotalBeforeDiscount = 0;
      this.invoiceDiscount = 0;
      this.getSchoolSessions();
      this.getItems();
      this.getSchoolTerms();
      this.getStudentClass();
      this.getPriceLists();
  }
   clear() {
    this.invoiceDetail = new InvoiceDetail();
   }
  onAdd() {
    if (this.invoice.discount < 0) {
      this.toastr.error('Discount must be a positive value!');
      return;
    }
    if (this.invoiceDetail.qty < 1) {
      this.toastr.error('Quantity must be greater than 0');
      return;
    }
    if (this.invoiceDetail.unitPrice < 1) {
      this.toastr.error('Unit Price must be greater than 0');
      return;
    }
    this.invoiceDetail.lineTotal = this.invoiceDetail.qty * this.invoiceDetail.unitPrice;
    const itemid = this.invoiceDetail.itemID;
    // tslint:disable-next-line:triple-equals
    // console.log(this.items.find( x => x.itemID == itemid));
    // tslint:disable-next-line:triple-equals
    this.invoiceDetail.itemName = this.items.filter( x => x.itemID == this.invoiceDetail.itemID )[0].itemName;
    this.InvoiceArray.push(this.invoiceDetail);
    this.calculateTotal();
    this.invoiceDetail = new InvoiceDetail();
    this.formReady = true;
  }
  onRemove(item: InvoiceDetail) {
    const i = this.InvoiceArray.indexOf(item);

    if (i !== -1) {
      this.InvoiceArray.splice(i, 1);
      this.calculateTotal();
    }
    if (this.InvoiceArray.length < 1) {
      this.formReady = false;
    }
  }
  onChangeItem() {
    this.invoiceDetail.unitPrice = 0;
    // tslint:disable-next-line:triple-equals
    const price = this.priceList.find(x => x.itemID == this.invoiceDetail.itemID
                                    // tslint:disable-next-line:triple-equals
                                    && x.schoolSessionID == this.invoice.schoolSessionID
                                    // tslint:disable-next-line:triple-equals
                                    && x.studentClassID == this.invoice.studentClassID
                                    // tslint:disable-next-line:triple-equals
                                    && x.schoolTermID == this.invoice.schoolTermID );
    this.invoiceDetail.unitPrice = price.unitPrice;
  }
  calculateTotal() {
    this.invoiceTotal = 0;
    this.invoiceTotalBeforeDiscount = 0;
    this.invoiceDiscount = 0;
    for (const i of this.InvoiceArray) {
      this.invoiceTotalBeforeDiscount += i.lineTotal;
    }
    this.invoice.invoiceTotalBeforeDiscount = this.invoiceTotalBeforeDiscount;
    // if (!this.invoice.Discount) {
    //   this.invoice.Discount = 0;
    // }
    this.invoiceDiscount = (this.invoice.discount / 100 ) * this.invoiceTotalBeforeDiscount;
    this.invoice.discountAmount = this.invoiceDiscount;
    this.invoiceTotal = this.invoiceTotalBeforeDiscount - this.invoiceDiscount;
    this.invoice.invoiceTotal = this.invoiceTotal;
  }

  onSubmit(form?: NgForm) {
    this.invoice.createdByID = this.userID;
    this.invoiceFull.invoiceID = 0;
    this.invoiceFull.invoiceNumber = this.invoice.invoiceNumber;
    this.invoiceFull.invoiceDate = this.invoice.invoiceDate;
    this.invoiceFull.customerName = this.invoice.customerName;
    this.invoiceFull.isCancelled = false;
    this.invoiceFull.invoiceTotal = this.invoice.invoiceTotal;
    this.invoiceFull.discountAmount = this.invoice.discountAmount;
    this.invoiceFull.discount = this.invoice.discount;
    this.invoiceFull.schoolTermID = this.invoice.schoolTermID;
    this.invoiceFull.schoolSessionID = this.invoice.schoolSessionID;
    this.invoiceFull.studentClassID = this.invoice.studentClassID;
    this.invoiceFull.status = 'Open';
    this.invoiceFull.invoiceTotalBeforeDiscount = this.invoice.invoiceTotalBeforeDiscount;
    this.invoiceFull.createdByID = this.invoice.createdByID;
    this.invoiceFull.invoiceDetails = this.InvoiceArray;
    this.handleAPI.create(this.invoiceFull, this.endpoint)
      .subscribe( (data: any) => {
          this.toastr.success('Invoice created!', 'Success');
          this.invID = data;
          console.log(data);
          this.print = true;
          this.formReady = false;
          this.resetForm();
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
  printInvoice() {
    this.route.navigate(['/print-invoice'], {
      queryParams: {id:  this.invID}
    });
  }

  getItems() {
    this.handleAPI.get('api/Item')
      .subscribe( (data: any) => {
        // console.log(data);
          this.items = data;
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
  getSchoolSessions() {
    this.handleAPI.get('api/SchoolSession/Active')
      .subscribe( (data: any) => {
        // console.log(data);
          this.schoolSession = data;
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
  getSchoolTerms() {
    this.handleAPI.get('api/SchoolTerm')
      .subscribe( (data: any) => {
        // console.log(data);
          this.schoolTerm = data;
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
  getStudentClass() {
    this.handleAPI.get('api/StudentClass')
      .subscribe( (data: any) => {
        // console.log(data);
          this.studentClass = data;
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
  getPriceLists() {
    this.priceList = [];
    this.handleAPI.get('api/PriceList')
      .subscribe( (data: any) => {
        // console.log(data);
          this.priceList = data;
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
