import { Component, OnInit } from '@angular/core';
import { PriceList, StudentClass, SchoolTerm, SchoolSession, Item } from '../../shared/models/invoice';

@Component({
  selector: 'app-price-lists',
  templateUrl: './price-lists.component.html',
  styleUrls: ['./price-lists.component.css']
})
export class PriceListsComponent implements OnInit {

  priceList: PriceList = new PriceList();

  priceLists: PriceList[] = [];
  studentClass: StudentClass[] = [];
  schoolTerm: SchoolTerm[] = [];
  schoolSession: SchoolSession[] = [];
  items: Item[] = [];

  constructor() { }

  ngOnInit() {
  }

  onAdd() {
    this.priceLists.push(this.priceList);
    this.priceList = new PriceList();
  }
  showForEdit(item: PriceList) {
    this.priceList = item;
  }

}
