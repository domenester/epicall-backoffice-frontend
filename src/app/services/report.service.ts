import { Injectable } from '@angular/core';
import { api as config } from '../config/configs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RequestService } from './request.service';

@Injectable()
export class ReportService {
    constructor(
      private http: HttpClient,
      private request: RequestService
    ) { }

    list(body: any) {
        return this.request.post(`${config.url}/report/list`, body)
          .pipe(
            map(response => response.body.data)
          );
    }

    enums() {
      return this.request.get(`${config.url}/report/enums`)
        .pipe(
          map(response => response.body)
        );
    }
}
