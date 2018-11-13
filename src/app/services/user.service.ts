import { Injectable } from '@angular/core';
import { RequestOptions, RequestOptionsArgs } from '@angular/http';
import { api as config } from '../config/configs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';

@Injectable()
export class UserService {
    constructor(
      private http: HttpClient,
      private request: RequestService
    ) { }

    list() {
      return this.request.get(`${config.url}/user/list`)
        .pipe(
          map(response => response.body.data)
        );
    }

    create(user: any) {
      return this.request.put(`${config.url}/user/new`, user);
    }

    update(user: any) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      return this.request.post(`${config.url}/user/update`, { id: currentUser.id, user });
    }

    remove(userId: string) {
      return this.request.delete(`${config.url}/user/delete`, { userId });
    }

    enums() {
      return this.request.get(`${config.url}/user/enums`)
        .pipe(
          map(response => response.body.data)
        );
    }
}
