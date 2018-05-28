import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ViewInvoiceComponent } from './invoice/view-invoice/view-invoice.component';
import { CompanyComponent } from './setup/company/company.component';
import { ViewUsersComponent } from './User/view-users/view-users.component';
import { UserPermissionComponent } from './User/user-permission/user-permission.component';
import { ViewItemsComponent } from './item-setup/view-items/view-items.component';
import { PriceListsComponent } from './item-setup/price-lists/price-lists.component';
import { MasterDataComponent } from './setup/master-data/master-data.component';
import { SchoolTermComponent } from './setup/master-data/school-term/school-term.component';
import { SchoolSessionComponent } from './setup/master-data/school-session/school-session.component';
import { StudentClassComponent } from './setup/master-data/student-class/student-class.component';
import { LoginComponent } from './login/login.component';
import { ItemSetupComponent } from './item-setup/item-setup.component';
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
    ViewItemsComponent,
    PriceListsComponent,
    MasterDataComponent,
    SchoolTermComponent,
    SchoolSessionComponent,
    StudentClassComponent,
    LoginComponent,
    ItemSetupComponent,
    UserComponent,
    PrintInvoiceComponent,
    ResetPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
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
