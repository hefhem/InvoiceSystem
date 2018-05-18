import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Invoice, InvoiceDetail } from '../shared/models/invoice';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent implements OnInit {
  invoiceTotal = 0;
  invoiceDiscount = 0;
  invoiceTotalAfterDiscount = 0;
  invoice = new Invoice();
  invoiceDetail = new InvoiceDetail();
  formReady = false;
  // = {
  //   InvoiceID: 0, ItemCode: '', ItemName: '', Qty: 0, UnitPrice: 0, LineTotal: 0
  // };
  InvoiceArray: InvoiceDetail[] = [];

  items = [
    {ItemID: 1, ItemName: 'School Fees'},
    {ItemID: 2, ItemName: 'School Uniform'},
    {ItemID: 3, ItemName: 'Tuition' }
  ];
  studentClass = [
    {StudentClassID: 1, StudentClassName: 'JSS 1'},
    {StudentClassID: 2, StudentClassName: 'JSS 2'},
    {StudentClassID: 3, StudentClassName: 'JSS 3'},
    {StudentClassID: 4, StudentClassName: 'SS 1'},
    {StudentClassID: 5, StudentClassName: 'SS 2'},
    {StudentClassID: 6, StudentClassName: 'SS 3'}
  ];
  schoolTerm = [
    {SchoolTermID: 1, SchoolTermName: 'First Term'},
    {SchoolTermID: 2, SchoolTermName: 'Second Term'},
    {SchoolTermID: 3, SchoolTermName: 'Third Term'}
  ];
  schoolSession = [
    {SchoolSessionID: 1, SchoolSessionName: '2016/2017'},
    {SchoolSessionID: 2, SchoolSessionName: '2017/2018'},
    {SchoolSessionID: 3, SchoolSessionName: '2018/2019'}
  ];

  constructor() { }

  ngOnInit() {
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
      this.InvoiceArray = [];
      this.invoiceTotal = 0;
      this.invoiceTotalAfterDiscount = 0;
      this.invoiceDiscount = 0;
    } else {
      this.invoiceDetail = new InvoiceDetail();
    }
  }
  onAdd() {
    this.invoiceDetail.lineTotal = this.invoiceDetail.Qty * this.invoiceDetail.unitPrice;
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
  calculateTotal() {
    this.invoiceTotal = 0;
    this.invoiceTotalAfterDiscount = 0;
    this.invoiceDiscount = 0;
    for (const i of this.InvoiceArray) {
      this.invoiceTotal += i.lineTotal;
    }
    // if (!this.invoice.Discount) {
    //   this.invoice.Discount = 0;
    // }
    this.invoiceDiscount = (this.invoice.discount / 100 ) * this.invoiceTotal;
    this.invoiceTotalAfterDiscount = this.invoiceTotal - this.invoiceDiscount;
  }

  onSubmit(form?: NgForm) {}

}
