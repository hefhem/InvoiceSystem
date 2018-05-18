import { Component, OnInit } from '@angular/core';
import { Item } from '../../shared/models/invoice';
import { ItemService } from '../../shared/services/item.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {

  item = {
    itemID: 0,
    itemName: '',
    createdByID: ''
  };

  items: Item[] = [];
  tokenData: any;
  userID: '';

  constructor(private itemSvc: ItemService, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit() {
    this.tokenData = this.authService.decodeToken();
    this.userID = this.tokenData.sid;
    this.getItems();
  }

  onAdd() {
    this.item.createdByID = this.userID;
    if (this.item.itemID === 0) {
      this.itemSvc.createItem(this.item)
        .subscribe( data => {
            this.toastr.success('Item added!', 'Success');
            this.item = {
              itemID: 0,
              itemName: '',
              createdByID: ''
            };
            this.getItems();
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
      this.itemSvc.updateItem(this.item)
        .subscribe( data => {
            this.toastr.success('Item Updated!', 'Success');
            this.item = {
              itemID: 0,
              itemName: '',
              createdByID: ''
            };
            this.getItems();
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
  showForEdit(item: any) {
    this.itemSvc.getItemByID(item.itemID)
      .subscribe( (data: any) => {
          this.items = data;
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

  removeItem(item: any) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.itemSvc.deleteItem(item.itemID)
        .subscribe( data => {
            this.toastr.success('Item removed', 'Success');
            this.getItems();
            console.log(data);
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
  getItems() {
    this.item = {
      itemID: 0,
      itemName: '',
      createdByID: ''
    };
    this.itemSvc.getItem()
      .subscribe( (data: any) => {
        console.log(data);
          this.items = data;
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
