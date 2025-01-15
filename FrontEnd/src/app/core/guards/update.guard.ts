import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PerrmissionService } from '../service/perrmission.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateGuard implements CanActivate {
  constructor(private perrmissionService: PerrmissionService) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.perrmissionService
      .getPermissions()
      .includes('can_update_users');
  }
}
