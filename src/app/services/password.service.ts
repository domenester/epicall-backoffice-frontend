import { Injectable } from '@angular/core';
import { api as config } from '../config/configs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class PasswordService {
    constructor(private http: HttpClient) { }

    requestNew(email: string) {
        return this.http.post<any>(`${config.url}/password/request`, { email });
    }

    reset(password: string, token: string = '') {
        return this.http.post<any>(`${config.url}/password/reset`, { password, token });
    }
}
