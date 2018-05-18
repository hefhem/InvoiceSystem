import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SchoolSession } from '../../../shared/models/invoice';

@Component({
  selector: 'app-school-session',
  templateUrl: './school-session.component.html',
  styleUrls: ['./school-session.component.css']
})
export class SchoolSessionComponent implements OnInit {
  schoolSession: SchoolSession = new SchoolSession();
  schoolSessions: SchoolSession[] = [];
  constructor() { }

  ngOnInit() {
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    } else {
      this.schoolSession = new SchoolSession();
    }
  }
  onAdd() {
    this.schoolSessions.push(this.schoolSession);
    this.schoolSession = new SchoolSession();
  }
}
