import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanPLaceOrderGuard } from 'src/app/core/guards/can-place-order.guard';
import { DishManagementComponent } from 'src/app/shared/components/dish-management/dish-management.component';
import { DishesComponent } from 'src/app/shared/components/dishes/dishes.component';
import { OrdersPageComponent } from 'src/app/shared/components/orders-page/orders-page.component';
import { TableOfErrorsComponent } from 'src/app/shared/components/table-of-errors/table-of-errors.component';
import { UsersErrorsComponent } from 'src/app/shared/components/users-errors/users-errors.component';
import { UsersOrdersComponent } from 'src/app/shared/components/users-orders/users-orders.component';

const routes: Routes = [
  {
    path: '',
    component: DishesComponent,
    canActivate: [CanPLaceOrderGuard],
  },
  {
    path: 'orders',
    component: OrdersPageComponent,
  },

  {
    path: 'users-orders',
    component: UsersOrdersComponent,
  },
  {
    path: 'dish-management',
    component: DishManagementComponent,
  },
  {
    path: 'errors',
    component: TableOfErrorsComponent,
  },
  {
    path: 'users-errors',
    component: UsersErrorsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DishRoutingModule {}
