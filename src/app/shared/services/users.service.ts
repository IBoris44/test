import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { API_CONSTANTS } from '../constants/api-constants';
import { User } from './../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http
      .get(`${this.apiUrl}${API_CONSTANTS.users}`)
      .pipe(map(data => (data as Array<any>).map(item => new User(item))));
  }
}
