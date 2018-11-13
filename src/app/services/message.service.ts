import { Injectable } from '@angular/core';
import { api as config } from '../config/configs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RequestService } from './request.service';

@Injectable()
export class MessageService {
    constructor(
      private http: HttpClient,
      private request: RequestService
    ) { }

    list() {
        return this.request.get(`${config.url}/message/list`)
          .pipe(
            map(response => response.body.data)
          );
    }
}
