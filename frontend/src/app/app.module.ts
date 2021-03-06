import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import { ProductEditComponent } from './components/products/product-edit/product-edit.component';
import { ClientsListComponent } from './components/clients/clients-list/clients-list.component';
import { ClientCreateComponent } from './components/clients/client-create/client-create.component';
import { ClientEditComponent } from './components/clients/client-edit/client-edit.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { SalesListComponent } from './components/sales/sales-list/sales-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SaleCreateComponent } from './components/sales/sale-create/sale-create.component';
import { SaleDetailComponent } from './components/sales/sale-detail/sale-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProductsListComponent,
    SidebarComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ClientsListComponent,
    ClientCreateComponent,
    ClientEditComponent,
    UsersListComponent,
    UserCreateComponent,
    UserEditComponent,
    SalesListComponent,
    NavbarComponent,
    SaleCreateComponent,
    SaleDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
