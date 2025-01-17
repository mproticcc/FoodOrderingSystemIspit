import { Component } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { OrderItemsService } from '../../services/order-items.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { PerrmissionService } from 'src/app/core/service/perrmission.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent {
  dishes: any[] = [];
  dishesAll: any[] = [];
  selectedDishes: any[] = [];
  permissions: any[] = [];
  canPlaceOrderPermission: boolean = false;
  canReadUser: boolean = false;
  userId: number = this.perrmissionService.userId;
  dishesToLoad: number = 10;
  scheduleValue: string = '';
  canScheduleOrder: boolean = false;

  constructor(
    private dishService: DishService,
    private orderItemsService: OrderItemsService,
    private router: Router,
    private perrmissionService: PerrmissionService
  ) {}

  ngOnInit() {
    this.permissions = this.perrmissionService.getPermissions();
    this.isUserHaveCanPlaceOrderPermission();
    this.isUserHavecanReadUserPermission();
    this.isUsercanScheduleOrderPermission();
    this.loadDishes();
  }

  loadDishes() {
    this.dishService.getAllDishes().subscribe((data: any) => {
      this.dishes = data;
      this.dishesAll = data;
      this.dishes = this.dishesAll!.slice(0, this.dishesToLoad);
    });
  }
  onDateTimeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedDateTime = input.value;
    this.scheduleValue = selectedDateTime;
  }

  orderDish(dish: any) {
    this.selectedDishes.push(dish);
  }
  ucitajJosJela(): void {
    const currentLength = this.dishes!.length;
    const additionalTickets = this.dishesAll!.slice(
      currentLength,
      currentLength + this.dishesToLoad
    );
    this.dishes = [...this.dishes!, ...additionalTickets];
  }

  deleteDish(dish: any) {
    const index = this.selectedDishes.indexOf(dish, 0);
    if (index > -1) {
      this.selectedDishes.splice(index, 1);
    }
  }
  istorijaSvihGresaka(): void {
    this.router.navigate(['/dishes/errors']);
  }
  istorijaKorisnickihGresaka(): void {
    this.router.navigate(['/dishes/users-errors']);
  }
  zakaziHranu(): void {
    if (this.scheduleValue == '') {
      alert('Morate odabrati datum!!!');
      return;
    }
    this.orderItemsService
      .scheduleOrderItems(this.selectedDishes, this.userId, this.scheduleValue)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          alert(response);
          this.selectedDishes = [];
        },
        error: (error) => {
          if (error.error && error.error.text) {
            alert(error.error.text);
            this.selectedDishes = [];
          } else {
            alert(error);
            this.selectedDishes = [];
          }
        },
      });
  }
  poruciHranu(): void {
    this.orderItemsService
      .createOrderItems(this.selectedDishes, this.userId)
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          alert('Uspesno poruceno');
          this.selectedDishes = [];
        } else {
          alert('Maksimalan broj istovremenih porudžbina je dostignut.');
        }
      });
  }

  svePorudzbine() {
    this.router.navigate(['/dishes/orders']);
  }

  svojePorudzbine() {
    this.router.navigate(['/dishes/users-orders']);
  }

  sviKorisnici() {
    this.router.navigate(['/users']);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  dodajNovoJelo(): void {
    this.router.navigate(['/dishes/dish-management']);
  }

  private isUserHaveCanPlaceOrderPermission(): void {
    this.canPlaceOrderPermission = false;
    this.perrmissionService.getPermissions().forEach((val) => {
      if (val == 'can_place_order') {
        this.canPlaceOrderPermission = true;
      }
    });
  }

  private isUserHavecanReadUserPermission(): void {
    this.canReadUser = false;
    this.perrmissionService.getPermissions().forEach((val) => {
      if (val == 'can_read_users') {
        this.canReadUser = true;
      }
    });
  }

  private isUsercanScheduleOrderPermission(): void {
    this.canScheduleOrder = false;
    this.perrmissionService.getPermissions().forEach((val) => {
      if (val == 'can_schedule_order') {
        this.canScheduleOrder = true;
      }
    });
  }
}
