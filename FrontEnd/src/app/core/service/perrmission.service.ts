import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PerrmissionService {
  permissions: string[] = [
    'can_create_users',
    'can_read_users',
    'can_update_users',
    'can_delete_users',
    'can_search_order',
    'can_place_order',
    'can_cancel_order',
    'can_track_order',
    'can_schedule_order',
  ];

  userId: number = 1;

  constructor() {}

  getPermissions(): string[] {
    return this.permissions;
  }

  resetPermissions(): void {
    this.permissions = [];
  }

  addPermission(permissions: string[]): void {
    this.permissions = permissions;
  }
}
