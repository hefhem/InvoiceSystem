import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentClass } from '../../../shared/models/invoice';

@Component({
  selector: 'app-student-class',
  templateUrl: './student-class.component.html',
  styleUrls: ['./student-class.component.css']
})
export class StudentClassComponent implements OnInit {
  studentClass: StudentClass = new StudentClass();
  studentClasses: StudentClass[] = [];
  constructor() { }

  ngOnInit() {
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    } else {
      this.studentClass = new StudentClass();
    }
  }
  onAdd() {
    this.studentClasses.push(this.studentClass);
    this.studentClass = new StudentClass();
  }

}
