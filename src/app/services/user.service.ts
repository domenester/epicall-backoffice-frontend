import { Injectable } from '@angular/core';
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
}
