import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  user: User = new User();
  users: User[] = [];
  constructor() { }

  ngOnInit() {
  }
  onAdd() {
    this.users.push(this.user);
    this.user = new User();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    } else {
      this.user = new User();
    }
  }
  showForEdit(item: User) {
    this.user = item;
  }
}
