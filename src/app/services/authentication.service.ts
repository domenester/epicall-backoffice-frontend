import { Injectable } from '@angular/core';
import { api as config } from '../config/configs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${config.url}/login`, { username, password })
            .pipe(map(user => {
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
