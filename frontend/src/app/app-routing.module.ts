import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientCreateComponent } from './components/clients/client-create/client-create.component';
import { ClientEditComponent } from './components/clients/client-edit/client-edit.component';
import { ClientsListComponent } from './components/clients/clients-list/clients-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import { ProductEditComponent } from './components/products/product-edit/product-edit.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'product/register', component: ProductCreateComponent },
  { path: 'product/edit/:id', component: ProductEditComponent },
  { path: 'clients', component: ClientsListComponent },
  { path: 'client/register', component: ClientCreateComponent },
  { path: 'client/edit/:id', component: ClientEditComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'user/register', component: UserCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
