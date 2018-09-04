import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DataTablesModule } from 'angular-datatables';
import { NgxBarcodeModule } from 'ngx-barcode';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ViewInvoiceComponent } from './invoice/view-invoice/view-invoice.component';
import { CompanyComponent } from './setup/company/company.component';
import { ViewUsersComponent } from './User/view-users/view-users.component';
import { UserPermissionComponent } from './User/user-permission/user-permission.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './User/user/user.component';
import { ApiService } from './shared/services/api.service';
import { AuthService } from './shared/services/auth.service';
import { HandleErrorService } from './shared/services/handle-error.service';
import { UtilService } from './shared/services/util.service';
import { StorageServiceModule } from 'angular-webstorage-service';
import { HttpClientModule } from '@angular/common/http';
import { HandleAPIService } from './shared/services/handle-api.service';
import { PrintInvoiceComponent } from './invoice/print-invoice/print-invoice.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { ChangePasswordComponent } from './User/change-password/change-password.component';
import { ReceiptProdComponent } from './receipt-prod/receipt-prod.component';
import { ViewReceiptProdComponent } from './receipt-prod/view-receipt-prod/view-receipt-prod.component';
import { PrintBarcodeComponent } from './receipt-prod/print-barcode/print-barcode.component';
import { PrintPackingSlipComponent } from './receipt-prod/print-packing-slip/print-packing-slip.component';
import { ArDeliveryComponent } from './ar-delivery/ar-delivery.component';
import { PrintArDeliveryComponent } from './ar-delivery/print-ar-delivery/print-ar-delivery.component';
import { ViewArDeliveryComponent } from './ar-delivery/view-ar-delivery/view-ar-delivery.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    InvoiceComponent,
    ViewInvoiceComponent,
    CompanyComponent,
    ViewUsersComponent,
    UserPermissionComponent,
    LoginComponent,
    UserComponent,
    PrintInvoiceComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    ReceiptProdComponent,
    ViewReceiptProdComponent,
    PrintBarcodeComponent,
    PrintPackingSlipComponent,
    ArDeliveryComponent,
    PrintArDeliveryComponent,
    ViewArDeliveryComponent
  ],
  imports: [
    BrowserModule,
    NgxBarcodeModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DataTablesModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    StorageServiceModule
  ],
  providers: [
    ApiService,
    AuthService,
    HandleErrorService,
    UtilService,
    HandleAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
