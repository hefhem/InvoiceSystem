import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ViewInvoiceComponent } from './invoice/view-invoice/view-invoice.component';
import { MasterDataComponent } from './setup/master-data/master-data.component';
import { CompanyComponent } from './setup/company/company.component';
import { UserPermissionComponent } from './User/user-permission/user-permission.component';
import { ViewUsersComponent } from './User/view-users/view-users.component';
import { PriceListsComponent } from './item-setup/price-lists/price-lists.component';
import { ViewItemsComponent } from './item-setup/view-items/view-items.component';
import { LoginComponent } from './login/login.component';
import { ItemSetupComponent } from './item-setup/item-setup.component';
import { UserComponent } from './User/user/user.component';
import { PrintInvoiceComponent } from './invoice/print-invoice/print-invoice.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { ChangePasswordComponent } from './User/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'invoice',
    component: InvoiceComponent
  },
  {
    path: 'view-invoice',
    component: ViewInvoiceComponent
  },
  {
    path: 'print-invoice/:id',
    component: PrintInvoiceComponent
  },
  {
    path: 'master-data',
    component: MasterDataComponent
  },
  {
    path: 'school',
    component: CompanyComponent
  },
  {
    path: 'item-setup',
    component: ItemSetupComponent
  },
  {
    path: 'user-settings',
    component: UserComponent
  },
  {
    path: 'reset-password/:id',
    component: ResetPasswordComponent
  }
  ,
  {
    path: 'change-password',
    component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
