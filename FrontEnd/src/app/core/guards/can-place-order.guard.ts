import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PerrmissionService } from '../service/perrmission.service';

@Injectable({
  providedIn: 'root',
})
export class CanPLaceOrderGuard implements CanActivate, CanLoad {
  constructor(private perrmissionService: PerrmissionService) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.perrmissionService.getPermissions().includes('can_place_order');
  }
  canLoad():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.perrmissionService.getPermissions().includes('can_place_order');
  }
}
