import { Injectable } from '@angular/core';
import { api as config } from '../config/configs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${config.url}/login`, { username, password })
            .pipe(map(response => {
                if (response) {
                    localStorage.setItem('currentUser', JSON.stringify(response.data));
                }
                return response.data;
            }));
    }

    logout() {
      localStorage.removeItem('currentUser');
    }
}
