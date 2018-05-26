import { Component, OnInit } from '@angular/core';
import { PriceList, StudentClass, SchoolTerm, SchoolSession, Item, PriceListView } from '../../shared/models/invoice';
import { HandleAPIService } from '../../shared/services/handle-api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-price-lists',
  templateUrl: './price-lists.component.html',
  styleUrls: ['./price-lists.component.css']
})
export class PriceListsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  endpoint = 'api/PriceList';
  priceList: PriceList = new PriceList();

  priceLists: PriceList[] = [];
  priceListView: PriceListView[] = [];
  studentClass: StudentClass[] = [];
  schoolTerm: SchoolTerm[] = [];
  schoolSession: SchoolSession[] = [];
  item: Item[] = [];

  userID: any;
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private handleAPI: HandleAPIService,
    private toastr: ToastrService,
    private authService: AuthService,
  private router: Router) { }

  ngOnInit() {
    const tv = this.authService.isTokenValid();
    if (!tv) {
        this.router.navigate(['/login']);
    }
    if (!this.authService.isAdmin()) {
      // this.toastr.warning('', 'Access Denied!');
      // this.router.navigate(['']);
        return;
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.userID = this.authService.getUserID();
    this.getPriceLists();
  }

  onAdd() {
    this.priceList.createdByID = this.userID;
    if (this.priceList.priceListID === 0) {
      this.handleAPI.create(this.priceList, this.endpoint)
        .subscribe( data => {
            this.toastr.success('Price List added!', 'Success');
            this.priceList = new PriceList();
            this.getPriceLists();
          },
          error => {
            if (error.object) {
              this.toastr.warning('Please check the console.', 'Oops! An error occurred');
            } else {
              this.toastr.warning(error, 'Oops! An error occurred');
            }
          }
        );
    } else {
      this.handleAPI.update(this.priceList, this.endpoint)
        .subscribe( data => {
            this.toastr.success('PriceList Updated!', 'Success');
            this.priceList = new PriceList();
            this.getPriceLists();
          },
          error => {
            if (error.object) {
              this.toastr.warning('Please check the console.', 'Oops! An error occurred');
            } else {
              this.toastr.warning(error, 'Oops! An error occurred');
            }
          }
        );
    }
  }
  showForEdit(priceList: any) {
    this.handleAPI.getByID(priceList.priceListID, this.endpoint)
      .subscribe( (data: any) => {
          this.priceList = data;
        },
        error => {
          if (error.object) {
            this.toastr.warning('Please check the console.', 'Oops! An error occurred');
          } else {
            this.toastr.warning(error, 'Oops! An error occurred');
          }
        }
    );
  }

  removePriceList(priceList: any) {
    if (confirm('Are you sure you want to delete this priceList?')) {
      this.handleAPI.delete(priceList.priceListID, this.endpoint)
        .subscribe( data => {
            this.toastr.success('Price List removed', 'Success');
            this.getPriceLists();
            // console.log(data);
          },
          error => {
            if (error.object) {
              this.toastr.warning('Please check the console.', 'Oops! An error occurred');
            } else {
              this.toastr.warning(error, 'Oops! An error occurred');
            }
          }
      );
   }
  }
  getPriceLists(form?: NgForm) {
    this.priceList = new PriceList();
    this.getItems();
    this.getSchoolSessions();
    this.getSchoolTerms();
    this.getStudentClass();
    if (form != null) {
      form.reset();
    }
    this.handleAPI.get(this.endpoint)
      .subscribe( (data: any) => {
        // console.log(data);
          this.priceListView = data;
          this.dtTrigger.next();
        },
        error => {
          if (error.object) {
            this.toastr.warning('Please check the console.', 'Oops! An error occurred');
          } else {
            this.toastr.warning(error, 'Oops! An error occurred');
          }
        }
    );
  }
  getItems() {
    this.handleAPI.get('api/Item')
      .subscribe( (data: any) => {
        // console.log(data);
          this.item = data;
        },
        error => {
          if (error.object) {
            this.toastr.warning('Please check the console.', 'Oops! An error occurred');
          } else {
            this.toastr.warning(error, 'Oops! An error occurred');
          }
        }
    );
  }
  getSchoolSessions() {
    this.handleAPI.get('api/SchoolSession/Active')
      .subscribe( (data: any) => {
        // console.log(data);
          this.schoolSession = data;
        },
        error => {
          if (error.object) {
            this.toastr.warning('Please check the console.', 'Oops! An error occurred');
          } else {
            this.toastr.warning(error, 'Oops! An error occurred');
          }
        }
    );
  }
  getSchoolTerms() {
    this.handleAPI.get('api/SchoolTerm')
      .subscribe( (data: any) => {
        // console.log(data);
          this.schoolTerm = data;
        },
        error => {
          if (error.object) {
            this.toastr.warning('Please check the console.', 'Oops! An error occurred');
          } else {
            this.toastr.warning(error, 'Oops! An error occurred');
          }
        }
    );
  }
  getStudentClass() {
    this.handleAPI.get('api/StudentClass')
      .subscribe( (data: any) => {
        // console.log(data);
          this.studentClass = data;
        },
        error => {
          if (error.object) {
            this.toastr.warning('Please check the console.', 'Oops! An error occurred');
          } else {
            this.toastr.warning(error, 'Oops! An error occurred');
          }
        }
    );
  }

}
