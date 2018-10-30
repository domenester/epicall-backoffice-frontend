import { Injectable } from '@angular/core';
import { api as config } from '../config/configs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ReportService {
    constructor(private http: HttpClient) { }

    list(body: any) {
        return this.http.post<any>(`${config.url}/report/list`, body)
          .pipe(
            map(response => response.data)
          );
    }
}
