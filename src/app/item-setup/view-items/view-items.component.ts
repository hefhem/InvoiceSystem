import { Component, OnInit } from '@angular/core';
import { Item } from '../../shared/models/invoice';
import { ItemService } from '../../shared/services/item.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HandleAPIService } from '../../shared/services/handle-api.service';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {
  endpoint = 'api/Item';
  item: Item = new Item();

  items: Item[] = [];
  tokenData: any;
  userID: any;

  constructor(
    private handleAPI: HandleAPIService,
    private toastr: ToastrService,
    private authService: AuthService,
  private route: Router) { }

  ngOnInit() {
    const tv = this.authService.isTokenValid();
    if (!tv) {
        this.route.navigate(['/login']);
    }
    this.userID = this.authService.getUserID();
    this.getItems();
  }

  onAdd() {
    this.item.createdByID = this.userID;
    if (this.item.itemID === 0) {
      this.handleAPI.create(this.item, this.endpoint)
        .subscribe( data => {
            this.toastr.success('Item added!', 'Success');
            this.item = new Item();
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
      this.handleAPI.update(this.item, this.endpoint)
        .subscribe( data => {
            this.toastr.success('Item Updated!', 'Success');
            this.item = new Item();
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
    this.handleAPI.getByID(item.itemID, this.endpoint)
      .subscribe( (data: any) => {
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

  removeItem(item: any) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.handleAPI.delete(item.itemID, this.endpoint)
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
    this.item = new Item();
    this.handleAPI.get(this.endpoint)
      .subscribe( (data: any) => {
        // console.log(data);
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
