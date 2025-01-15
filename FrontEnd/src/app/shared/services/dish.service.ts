import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private apiUrl = 'http://localhost:8080/api/dishes';

  constructor(private http: HttpClient) {}

  getAllDishes(): Observable<any> {
    const header = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token')!
    );

    return this.http.get(`${this.apiUrl}/getAll`, {
      headers: header,
    });
  }

  getDishById(id: number): Observable<any> {
    const header = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token')!
    );
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: header,
    });
  }

  createDish(dish: any): Observable<any> {
    const header = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token')!
    );
    return this.http.post(this.apiUrl, dish, {
      headers: header,
    });
  }

  updateDish(id: number, dish: any): Observable<any> {
    const header = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token')!
    );
    return this.http.put(`${this.apiUrl}/${id}`, dish, {
      headers: header,
    });
  }

  deleteDish(id: number): Observable<any> {
    const header = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token')!
    );
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: header,
    });
  }
}
