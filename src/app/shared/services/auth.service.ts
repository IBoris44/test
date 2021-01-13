import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../classes/user';
import { API_CONSTANTS } from '../constants/api-constants';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  get isUserLogged(): User {
    const user = localStorage.getItem('user') || '';
    return JSON.parse(user);
  }

  get isAdmin(): boolean {
      const user = localStorage.getItem('user') || '';
      return  JSON.parse(user).role === 'Admin';
  }

  constructor(private http: HttpClient) { }

  public login(userInfo: any): Observable<User> {
    return this.http
      .post(`${this.apiUrl}${API_CONSTANTS.login}`, userInfo)
      .pipe(map(value => new User(value)));
  }

  public logout(): void {
    localStorage.clear();
  }

  public get token(): string | null {
    return localStorage.getItem('token');
  }

  public setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    if (user.token) {
      localStorage.setItem('token', user.token);
    }
  }
}
