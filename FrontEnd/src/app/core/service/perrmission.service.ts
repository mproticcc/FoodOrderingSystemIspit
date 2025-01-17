import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PerrmissionService {
  permissions: string[] = [];

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
