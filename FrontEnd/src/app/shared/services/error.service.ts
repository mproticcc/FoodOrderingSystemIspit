import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private apiUrl = 'http://localhost:8080/api/errors';

  constructor(private http: HttpClient) {}

  getAllErrors(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getAllUsersErrors(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/usersErrors/${userId}`);
  }
}
