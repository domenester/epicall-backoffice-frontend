import { Injectable } from '@angular/core';
import config from '../../config/path';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${config.api.url}/login`, { username, password })
            .pipe(map(res => {
                // if (res.code && res.code >= 400) {}
                // if (user && user.token) {
                //     localStorage.setItem('currentUser', JSON.stringify(user));
                // }
                // return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
