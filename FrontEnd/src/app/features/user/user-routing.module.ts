import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGuard } from 'src/app/core/guards/add.guard';
import { LoginGuard } from 'src/app/core/guards/login.guard';
import { UpdateGuard } from 'src/app/core/guards/update.guard';
import { AddUserComponent } from 'src/app/shared/components/add-user/add-user.component';
import { TabelOfUsersComponent } from 'src/app/shared/components/tabel-of-users/tabel-of-users.component';
import { UpdateUserComponent } from 'src/app/shared/components/update-user/update-user.component';

const routes: Routes = [
  {
    path: '',
    component: TabelOfUsersComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'add',
    component: AddUserComponent,
    canActivate: [AddGuard],
  },
  {
    path: 'update',
    component: UpdateUserComponent,
    canActivate: [UpdateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
