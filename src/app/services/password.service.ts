import { Injectable } from '@angular/core';
import { api as config } from '../config/configs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RequestService } from './request.service';

@Injectable()
export class PasswordService {
    constructor(
      private http: HttpClient,
      private request: RequestService
    ) { }

    requestNew(email: string) {
        return this.http.post<any>(`${config.url}/password/request`, { email });
    }

    reset(password: string, token: string = '') {
        return this.http.post<any>(`${config.url}/password/reset`, { password, token });
    }

    change(password: string, newPassword: string) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      return this.request.post(`${config.url}/password/change`, {
        password,
        newPassword,
        username: currentUser.username,
        userId: currentUser.id
      });
    }
}
