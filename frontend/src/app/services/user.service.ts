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

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
    this.user = new User('', '', '', '', '', '');
  }

  login(email: String, password: String): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(
      this.url + 'api/v1/users/login',
      { email, password },
      { headers: headers }
    );
  }

  getUser() {}
}
