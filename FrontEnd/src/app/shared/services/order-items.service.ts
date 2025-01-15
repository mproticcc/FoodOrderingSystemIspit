import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderItemsService {
  private apiUrl = 'http://localhost:8080/api/order-items';

  constructor(private http: HttpClient) {}

  getAllOrderItems(): Observable<any> {
    const header = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token')!
    );
    return this.http.get(`${this.apiUrl}`, {
      headers: header,
    });
  }

  getOrderItemById(id: number): Observable<any> {
    const header = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token')!
    );
    return this.http.get(`${this.apiUrl}/order/${id}`, {
      headers: header,
    });
  }

  createOrderItems(dishes: any[], userId: number): Observable<any> {
    const header = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token')!
    );

    const requestBody = {
      dishes: dishes,
      userId: userId,
    };

    return this.http.post(`${this.apiUrl}/create`, requestBody, {
      headers: header,
    });
  }

  updateOrderItem(id: number, orderItem: any): Observable<any> {
    const header = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token')!
    );
    return this.http.put(`${this.apiUrl}/${id}`, orderItem, {
      headers: header,
    });
  }

  deleteOrderItem(id: number): Observable<any> {
    const header = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token')!
    );
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: header,
    });
  }
}
