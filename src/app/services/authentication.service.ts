import { Injectable } from '@angular/core';
import { api as config } from '../config/configs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';

@Injectable()
export class AuthenticationService {
    constructor(
      private http: HttpClient,
      private request: RequestService
    ) { }

    login(username: string, password: string) {
        return this.request.post(
          `${config.url}/login`,
          { username, password }
        ).pipe(map(response => {
              if (response) {
                localStorage.setItem('currentUser', JSON.stringify(response.body.data));
              }
              return response;
            })
          );
    }

    logout() {
      localStorage.removeItem('currentUser');
    }
}
