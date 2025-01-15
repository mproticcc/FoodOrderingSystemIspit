import { Component } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { Dish } from 'src/app/core/model/model';
import { Router } from '@angular/router';
import { PerrmissionService } from 'src/app/core/service/perrmission.service';

@Component({
  selector: 'app-dish-management',
  templateUrl: './dish-management.component.html',
  styleUrls: ['./dish-management.component.scss'],
})
export class DishManagementComponent {
  dishes: any[] = [];
  name: string = '';
  price: number = 0;

  constructor(private dishService: DishService, private router: Router) {}

  ngOnInit() {
    this.loadDishes();
  }

  loadDishes() {
    this.dishService.getAllDishes().subscribe((data) => (this.dishes = data));
  }

  saveDish() {
    let dish = {
      name: this.name,
      price: this.price,
    };

    this.dishService.createDish(dish).subscribe(() => this.loadDishes());
  }

  deleteDish(id: number) {
    this.dishService.deleteDish(id).subscribe(() => this.loadDishes());
  }

  cancel() {
    this.router.navigate(['/dishes']);
  }
}
