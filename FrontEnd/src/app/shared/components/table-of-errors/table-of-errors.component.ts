import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-table-of-errors',
  templateUrl: './table-of-errors.component.html',
  styleUrls: ['./table-of-errors.component.scss'],
})
export class TableOfErrorsComponent implements OnInit {
  errorsMessages: any[] = [];
  errorsMessagesAll: any[] = [];
  errorMessageToLoad: number = 2;

  constructor(private errorService: ErrorService, private router: Router) {}
  ngOnInit(): void {
    this.loadIstorijaSvihGresaka();
  }

  loadIstorijaSvihGresaka(): void {
    this.errorService
      .getAllErrors()
      .pipe(take(1))
      .subscribe((data) => {
        this.errorsMessagesAll = data;
        this.errorsMessages = this.errorsMessagesAll!.slice(
          0,
          this.errorMessageToLoad
        );
      });
  }

  cancel() {
    this.router.navigate(['/dishes']);
  }

  ucitajJosGreska(): void {
    const currentLength = this.errorsMessages!.length;
    const additionalTickets = this.errorsMessagesAll!.slice(
      currentLength,
      currentLength + this.errorMessageToLoad
    );
    this.errorsMessages = [...this.errorsMessages!, ...additionalTickets];
  }
}
