import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public url;
  public user;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
    this.user = new User('', '', '', '', '', '');
  }

  login(email: String, password: String): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(
      this.url + 'api/v1/users/login',
      { email, password },
      { headers: headers }
    );
  }

  register(user: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(
      this.url + 'api/v1/users/register',
      {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: user.role,
      },
      { headers: headers }
    );
  }

  updateUserById(user: any, id: String): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(
      this.url + 'api/v1/users/' + id,
      {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        password: user.password,
      },
      { headers: headers }
    );
  }

  getUserById(id: String): Observable<any> {
    return this.http.get(this.url + 'api/v1/users/' + id);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.url + 'api/v1/users');
  }
}
