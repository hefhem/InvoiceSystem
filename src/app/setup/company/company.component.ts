import { Component, OnInit } from '@angular/core';
import { Company } from '../../shared/models/company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  company: Company = new Company();

  constructor() { }

  ngOnInit() {
  }
  onAdd() {

  }
  resetForm() {
    this.company = new Company();
  }
}
