import { Injectable } from '@angular/core';
import { api as config } from '../config/configs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class RecordService {
    constructor(private http: HttpClient) { }

    list(queryParameters: string = '') {
        return this.http.get<any>(`${config.url}/record/list${queryParameters}`)
          .pipe(
            map(response => response.data)
          );
    }
}
