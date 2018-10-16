import { Injectable } from '@angular/core';
import { RequestOptions, RequestOptionsArgs } from '@angular/http';
import { api as config } from '../config/configs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    list() {
        return this.http.get<any>(`${config.url}/user/list`)
          .pipe(
            map(response => response.data)
          );
    }

    create(user: any) {
      return this.http.put<any>(`${config.url}/user/new`, user);
    }

    update(user: any) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      return this.http.post<any>(`${config.url}/user/update`, { id: currentUser.id, user });
    }

    remove(userId: string) {
      return this.http.delete<any>(`${config.url}/user/delete`, {
        observe: 'body',
        params: { userId }
      });
    }

    enums() {
      return this.http.get<any>(`${config.url}/user/enums`)
        .pipe(
          map(response => response.data)
        );
    }
}
