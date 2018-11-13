import { Injectable } from '@angular/core';
import { api as config } from '../config/configs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';

@Injectable()
export class RecordService {
    constructor(
      private http: HttpClient,
      private request: RequestService
    ) { }

    list(queryParameters: string = '') {
        return this.request.get(`${config.url}/record/list${queryParameters}`)
          .pipe(
            map(response => response.body.data)
          );
    }
}
