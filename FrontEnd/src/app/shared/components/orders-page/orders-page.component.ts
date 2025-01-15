import { OrderService } from './../../services/order.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { OrderItemsService } from '../../services/order-items.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { PerrmissionService } from 'src/app/core/service/perrmission.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  orderItems: any[] = [];
  canCancelOrderPermission: boolean = false;
  searchId: string = '';
  selectedStatus: string = '-___-';
  startDate: any = null;
  endDate: any = null;
  private subscription: Subscription | undefined;

  constructor(
    private orderItemsService: OrderItemsService,
    private orderService: OrderService,
    private router: Router,
    private perrmissionService: PerrmissionService
  ) {}
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.isUserHaveCanCancelOrderPermission();
    this.loadOrders();
  }

  loadOrders() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.orderItemsService.getAllOrderItems().subscribe((data) => {
      this.orderItems = data;
    });

    this.subscription = interval(2000).subscribe(() => {
      this.orderItemsService.getAllOrderItems().subscribe((data) => {
        this.orderItems = data;
      });
    });
  }

  filtirajPoruzbinePodatumu(event: {
    start: Date | null;
    end: Date | null;
  }): void {
    if (event.start! == null || event.end! == null) {
      return;
    }
    this.startDate = new Date(event.start);
    this.endDate = new Date(event.end);
    this.endDate.setHours(23, 59, 59, 999);
  }

  filtirajPoIdKorniska(value: string) {
    this.searchId = value;
  }

  removeOrder(id: number) {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.loadOrders();
    });
  }

  onStatusChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedStatus = selectedValue;
  }

  groupedOrdersByOrderId(): any[] {
    const groupedOrders = this.orderItems.reduce((acc, currentItem) => {
      const orderId = currentItem.order.id;

      if (!acc[orderId]) {
        acc[orderId] = {
          order: currentItem.order,
          dishes: [],
          date: currentItem.date,
        };
      }

      acc[orderId].dishes.push(currentItem.dish);
      return acc;
    }, {} as Record<string, any>);

    let groupedOrdersArray = Object.values(groupedOrders);

    groupedOrdersArray.sort((a: any, b: any) => {
      const dateA = new Date(a.date.trim());
      const dateB = new Date(b.date.trim());
      return dateB.getTime() - dateA.getTime();
    });

    if (this.searchId.trim() != '') {
      groupedOrdersArray = groupedOrdersArray
        .map((order: any) => {
          if (order.order.createdBy.id == Number(this.searchId)) {
            return order;
          }
          return null;
        })
        .filter((order: any) => order !== null);
    }

    if (this.selectedStatus != '-___-') {
      groupedOrdersArray = groupedOrdersArray
        .map((order: any) => {
          if (order.order.status == this.selectedStatus) {
            return order;
          }
          return null;
        })
        .filter((order: any) => order !== null);
    }

    if (this.startDate != null && this.endDate != null) {
      groupedOrdersArray = groupedOrdersArray
        .map((order: any) => {
          const orderDate = new Date(order.date);

          if (orderDate >= this.startDate && orderDate <= this.endDate) {
            return order;
          }
          return null;
        })
        .filter((order: any) => order !== null);
    }

    return groupedOrdersArray;
  }

  cancel() {
    this.router.navigate(['/dishes']);
  }

  private isUserHaveCanCancelOrderPermission(): void {
    this.canCancelOrderPermission = false;
    this.perrmissionService.getPermissions().forEach((val) => {
      if (val == 'can_cancel_order') {
        this.canCancelOrderPermission = true;
      }
    });
  }
}
