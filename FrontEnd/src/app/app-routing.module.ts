import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { CanPLaceOrderGuard } from './core/guards/can-place-order.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dishes',
    loadChildren: () =>
      import('./features/dish/dish.module').then((m) => m.DishModule),
    canActivate: [CanPLaceOrderGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/user/user.module').then((m) => m.UserModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
