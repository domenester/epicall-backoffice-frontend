import { Injectable } from '@angular/core';
import { api as config } from '../config/configs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class MessageService {
    constructor(private http: HttpClient) { }

    list() {
        return this.http.get<any>(`${config.url}/message/list`)
          .pipe(
            map(response => response.data)
          );
    }
}
