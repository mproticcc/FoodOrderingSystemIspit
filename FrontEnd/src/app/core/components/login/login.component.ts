import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackService } from '../../service/back.service';
import { ReadUsersDto } from '../../model/model';
import { PerrmissionService } from '../../service/perrmission.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string;
  password: string;
  service: BackService;
  message: string;
  constructor(
    service: BackService,
    private router: Router,
    private perrmissionService: PerrmissionService
  ) {
    this.email = '';
    this.password = '';
    this.service = service;
    this.message = '';
  }
  login() {
    this.service.login(this).subscribe(
      (val: any) => {
        localStorage.setItem('token', val.token);
        this.service.getSingleUser(this.email).subscribe((val: any) => {
          this.perrmissionService.addPermission(val.permissions);
          this.perrmissionService.userId = val.id;
          if (Object.keys(val.permissions).length) {
            if (val.permissions.includes('can_read_users')) {
              this.router.navigate(['/users']);
            }

            if (val.permissions.includes('can_place_order')) {
              this.router.navigate(['/dishes']);
            }
          } else {
            alert('Luzeru, nemas ni jendu permisiju!!!!');
          }
        });
      },
      (error: any) => {
        this.message = 'Invalid credentials';
      }
    );
  }
}
