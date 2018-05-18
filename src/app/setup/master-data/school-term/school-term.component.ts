import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SchoolTerm } from '../../../shared/models/invoice';


@Component({
  selector: 'app-school-term',
  templateUrl: './school-term.component.html',
  styleUrls: ['./school-term.component.css']
})
export class SchoolTermComponent implements OnInit {
  schoolTerm: SchoolTerm = new SchoolTerm();
  schoolTerms: SchoolTerm[] = [];
  constructor() { }

  ngOnInit() {
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    } else {
      this.schoolTerm = new SchoolTerm();
    }
  }
  onAdd() {
    this.schoolTerms.push(this.schoolTerm);
    this.schoolTerm = new SchoolTerm();
  }
}
