import { Component, OnInit } from '@angular/core';
import { ProdMaster, ProdDetail } from '../shared/models/production';

@Component({
  selector: 'app-receipt-prod',
  templateUrl: './receipt-prod.component.html',
  styleUrls: ['./receipt-prod.component.css']
})
export class ReceiptProdComponent implements OnInit {
  prodMaster: ProdMaster = new ProdMaster();
  prodDetail: ProdDetail[] = [];
  constructor() { }

  ngOnInit() {
  }

}
