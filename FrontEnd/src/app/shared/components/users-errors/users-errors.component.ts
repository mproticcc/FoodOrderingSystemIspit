import { PerrmissionService } from 'src/app/core/service/perrmission.service';
import { Component } from '@angular/core';
import { ErrorService } from '../../services/error.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-users-errors',
  templateUrl: './users-errors.component.html',
  styleUrls: ['./users-errors.component.scss'],
})
export class UsersErrorsComponent {
  errorsMessages: any[] = [];
  userId: number = this.permissionService.userId;

  constructor(
    private errorService: ErrorService,
    private router: Router,
    private permissionService: PerrmissionService
  ) {}
  ngOnInit(): void {
    this.loadIstorijaSvihGresaka();
  }

  loadIstorijaSvihGresaka(): void {
    this.errorService
      .getAllUsersErrors(this.userId)
      .pipe(take(1))
      .subscribe((data) => {
        this.errorsMessages = data;
      });
  }

  cancel() {
    this.router.navigate(['/dishes']);
  }
}
