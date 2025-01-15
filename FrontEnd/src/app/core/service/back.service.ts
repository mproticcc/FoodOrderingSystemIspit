import { Injectable } from '@angular/core';
import { CreateUserDto, ReadUsersDto, TokenDto, UserDto } from '../model/model';
import { Observable } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackService {
  basepath: string;
  constructor(private httpClient: HttpClient) {
    this.basepath = 'http://localhost:8080/api/';
  }

  login(source: LoginComponent): Observable<TokenDto> {
    return this.httpClient.post<TokenDto>(this.basepath + 'user/login', {
      email: source.email,
      password: source.password,
    });
  }

  getUsers(): Observable<ReadUsersDto> {
    const header = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token')!
    );
    return this.httpClient.get<ReadUsersDto>(this.basepath + 'user/read', {
      headers: header,
    });
  }

  getSingleUser(email: string): Observable<any> {
    const header = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token')!
    );

    return this.httpClient.post<any>(
      `${this.basepath}user/getSingleUser`,
      email,
      {
        headers: header,
      }
    );
  }

  createUser(user: CreateUserDto): Observable<any> {
    const header = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token')!
    );
    return this.httpClient.post(this.basepath + 'user/create', user, {
      headers: header,
    });
  }

  deleteUser(email: String): Observable<any> {
    const header = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token')!
    );
    return this.httpClient.delete(this.basepath + 'user/remove/' + email, {
      headers: header,
    });
  }

  updateUser(user: UserDto): Observable<any> {
    const header = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token')!
    );
    return this.httpClient.put(this.basepath + 'user/change', user, {
      headers: header,
    });
  }
}
