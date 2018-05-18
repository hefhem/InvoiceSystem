import { Component, OnInit } from '@angular/core';
import { InvoiceDetail } from '../../shared/models/invoice';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit {
  InvoiceArray: InvoiceDetail[] = [];
  constructor() { }

  ngOnInit() {
  }

}
