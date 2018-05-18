import { Component, OnInit } from '@angular/core';
import { PriceList, StudentClass, SchoolTerm, SchoolSession, Item } from '../../shared/models/invoice';

@Component({
  selector: 'app-price-lists',
  templateUrl: './price-lists.component.html',
  styleUrls: ['./price-lists.component.css']
})
export class PriceListsComponent implements OnInit {

  priceList: PriceList = new PriceList();

  priceLists: object[] = [];
  studentClass: StudentClass[] = [
    {studentClassID: 1, studentClassName: 'JSS 1', createdByID: 1},
    {studentClassID: 2, studentClassName: 'JSS 2', createdByID: 1},
    {studentClassID: 3, studentClassName: 'JSS 3', createdByID: 1},
    {studentClassID: 4, studentClassName: 'SS 1', createdByID: 1},
    {studentClassID: 5, studentClassName: 'SS 2', createdByID: 1},
    {studentClassID: 6, studentClassName: 'SS 3', createdByID: 1}
  ];
  schoolTerm: SchoolTerm[] = [
    {schoolTermID: 1, schoolTermName: 'First Term', createdByID: 1 },
    {schoolTermID: 2, schoolTermName: 'Second Term', createdByID: 1 },
    {schoolTermID: 3, schoolTermName: 'Third Term', createdByID: 1}
  ];
  schoolSession: SchoolSession[] = [
    {schoolSessionID: 1, schoolSessionName: '2016/2017', createdByID: 1},
    {schoolSessionID: 2, schoolSessionName: '2017/2018', createdByID: 1},
    {schoolSessionID: 3, schoolSessionName: '2018/2019', createdByID: 1}
  ];
  items: Item[] = [
    {itemID: 1, itemName: 'School Fees', createdByID: 1},
    {itemID: 2, itemName: 'School Uniform', createdByID: 1},
    {itemID: 3, itemName: 'Tuition', createdByID: 1 }
  ];

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
