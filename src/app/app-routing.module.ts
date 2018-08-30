import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ViewInvoiceComponent } from './invoice/view-invoice/view-invoice.component';
import { CompanyComponent } from './setup/company/company.component';
import { UserPermissionComponent } from './User/user-permission/user-permission.component';
import { ViewUsersComponent } from './User/view-users/view-users.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './User/user/user.component';
import { PrintInvoiceComponent } from './invoice/print-invoice/print-invoice.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { ChangePasswordComponent } from './User/change-password/change-password.component';
import { ReceiptProdComponent } from './receipt-prod/receipt-prod.component';
import { ViewReceiptProdComponent } from './receipt-prod/view-receipt-prod/view-receipt-prod.component';
import { ArDeliveryComponent } from './ar-delivery/ar-delivery.component';
import { PrintArDeliveryComponent } from './ar-delivery/print-ar-delivery/print-ar-delivery.component';
import { ViewArDeliveryComponent } from './ar-delivery/view-ar-delivery/view-ar-delivery.component';
import { PrintBarcodeComponent } from './receipt-prod/print-barcode/print-barcode.component';
import { PrintPackingSlipComponent } from './receipt-prod/print-packing-slip/print-packing-slip.component';

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
    path: 'receipt-prod',
    component: ReceiptProdComponent
  },
  {
    path: 'view-receipt-prod',
    component: ViewReceiptProdComponent
  },
  {
    path: 'print-barcode/:id',
    component: PrintBarcodeComponent
  },
  {
    path: 'print-packing-slip',
    component: PrintPackingSlipComponent
  },
  {
    path: 'ar-delivery',
    component: ArDeliveryComponent
  },
  {
    path: 'view-ar-delivery',
    component: ViewArDeliveryComponent
  },
  {
    path: 'print-ar-delivery',
    component: PrintArDeliveryComponent
  },
  {
    path: 'school',
    component: CompanyComponent
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
