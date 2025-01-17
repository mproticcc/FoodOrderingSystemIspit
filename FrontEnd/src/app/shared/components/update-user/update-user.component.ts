import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from 'src/app/core/model/model';
import { BackService } from 'src/app/core/service/back.service';
import { PerrmissionService } from 'src/app/core/service/perrmission.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent {
  user: UserDto;
  can_read_users: boolean = false;
  can_create_users: boolean = false;
  can_update_users: boolean = false;
  can_delete_users: boolean = false;
  can_search_order: boolean = false;
  can_place_order: boolean = false;
  can_cancel_order: boolean = false;
  can_track_order: boolean = false;
  can_schedule_order: boolean = false;

  constructor(
    private service: BackService,
    private router: Router,
    private perrmisionServie: PerrmissionService
  ) {
    this.user = JSON.parse(localStorage.getItem('user')!);

    if (this.user.permissions.indexOf('can_read_users') != -1) {
      this.can_read_users = true;
    }
    if (this.user.permissions.indexOf('can_create_users') != -1) {
      this.can_create_users = true;
    }
    if (this.user.permissions.indexOf('can_delete_users') != -1) {
      this.can_delete_users = true;
    }
    if (this.user.permissions.indexOf('can_update_users') != -1) {
      this.can_update_users = true;
    }
    if (this.user.permissions.indexOf('can_search_order') != -1) {
      this.can_search_order = true;
    }
    if (this.user.permissions.indexOf('can_place_order') != -1) {
      this.can_place_order = true;
    }
    if (this.user.permissions.indexOf('can_cancel_order') != -1) {
      this.can_cancel_order = true;
    }
    if (this.user.permissions.indexOf('can_track_order') != -1) {
      this.can_track_order = true;
    }
    if (this.user.permissions.indexOf('can_schedule_order') != -1) {
      this.can_schedule_order = true;
    }
  }

  updateUser() {
    var permissions: string[] = [];
    if (this.can_read_users) {
      permissions.push('can_read_users');
    }
    if (this.can_create_users) {
      permissions.push('can_create_users');
    }
    if (this.can_update_users) {
      permissions.push('can_update_users');
    }
    if (this.can_delete_users) {
      permissions.push('can_delete_users');
    }
    if (this.can_search_order) {
      permissions.push('can_search_order');
    }
    if (this.can_place_order) {
      permissions.push('can_place_order');
    }
    if (this.can_cancel_order) {
      permissions.push('can_cancel_order');
    }
    if (this.can_track_order) {
      permissions.push('can_track_order');
    }
    if (this.can_schedule_order) {
      permissions.push('can_schedule_order');
    }
    if (this.user.id == this.perrmisionServie.userId) {
      this.perrmisionServie.permissions = permissions;
    }
    this.user.permissions = permissions;

    this.service.updateUser(this.user).subscribe((val) => {
      localStorage.removeItem('user');
      this.router.navigate(['/users']);
    });
  }

  cancel() {
    localStorage.removeItem('user');
    this.router.navigate(['/users']);
  }
}
