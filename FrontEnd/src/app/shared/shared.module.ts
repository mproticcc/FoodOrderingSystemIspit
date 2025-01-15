import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './components/add-user/add-user.component';
import { TabelOfUsersComponent } from './components/tabel-of-users/tabel-of-users.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { DishManagementComponent } from './components/dish-management/dish-management.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { OrdersPageComponent } from './components/orders-page/orders-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';
import { TableOfErrorsComponent } from './components/table-of-errors/table-of-errors.component';
import { UsersOrdersComponent } from './components/users-orders/users-orders.component';
import { UsersErrorsComponent } from './components/users-errors/users-errors.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const COMPONENTS = [
  AddUserComponent,
  TabelOfUsersComponent,
  UpdateUserComponent,
  DishManagementComponent,
  DishesComponent,
  OrdersPageComponent,
  TableOfErrorsComponent,
  UsersOrdersComponent,
  UsersErrorsComponent,
  DatePickerComponent,
];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CoreModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,

    MatInputModule,
  ],
  exports: [...COMPONENTS],
})
export class SharedModule {}
