import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserDto } from 'src/app/core/model/model';
import { BackService } from 'src/app/core/service/back.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  name: string;
  surname: string;
  email: string;
  greska: string = '';
  password: string;
  can_read_users: boolean;
  can_create_users: boolean;
  can_update_users: boolean;
  can_delete_users: boolean;
  can_search_order: boolean;
  can_place_order: boolean;
  can_cancel_order: boolean;
  can_track_order: boolean;
  can_schedule_order: boolean;
  constructor(private service: BackService, private router: Router) {
    this.name = '';
    this.surname = '';
    this.email = '';
    this.password = '';
    this.can_read_users = true;
    this.can_create_users = false;
    this.can_update_users = false;
    this.can_delete_users = false;
    this.can_search_order = false;
    this.can_place_order = false;
    this.can_cancel_order = false;
    this.can_track_order = false;
    this.can_schedule_order = false;
  }

  addUser() {
    var permissions: string[] = [];
    if (this.can_read_users) permissions.push('can_read_users');
    if (this.can_create_users) permissions.push('can_create_users');
    if (this.can_update_users) permissions.push('can_update_users');
    if (this.can_delete_users) permissions.push('can_delete_users');
    if (this.can_search_order) permissions.push('can_search_order');
    if (this.can_place_order) permissions.push('can_place_order');
    if (this.can_cancel_order) permissions.push('can_cancel_order');
    if (this.can_track_order) permissions.push('can_track_order');
    if (this.can_schedule_order) permissions.push('can_schedule_order');
    var user = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      permissions: permissions,
    } as CreateUserDto;

    this.service.createUser(user).subscribe({
      next: (val) => {
        this.router.navigate(['/users']);
        this.greska = '';
      },
      error: (err) => {
        this.greska = err.error.message;
      },
    });
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}
