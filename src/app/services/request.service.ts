import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Injectable()
export class RequestService {
    constructor(
      private http: HttpClient,
      private router: Router,
      private alertService: AlertService,
    ) { }

    headers() {
      return ({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization') || ''
      });
    }

    setToken(response: HttpResponse<any>): HttpResponse<any> {
      localStorage.setItem('Authorization', response.headers.get('Authorization'));
      return response;
    }

    errorHandling(error: any) {
      if (error.status === 401) {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/']);
      }
      return error;
    }

    post(url: string, body: any) {
      return this.http.post<any>(url, body, {
        headers: this.headers(),
        observe: 'response'
      }).pipe(
        map(this.setToken)
      ).do(
        res => res,
        error => this.errorHandling(error)
      );
    }

    get(url: string, params?: any) {
      return this.http.get<any>(url, {
        params,
        headers: this.headers(),
        observe: 'response'
      }).pipe(
        map(this.setToken)
      ).do(
        res => res,
        error => this.errorHandling(error)
      );
    }

    put(url: string, body: any) {
      return this.http.put<any>(url, body, {
        headers: this.headers(),
        observe: 'response'
      }).pipe(
        map(this.setToken)
      ).do(
        res => res,
        error => this.errorHandling(error)
      );
    }

    delete(url: string, params?: any) {
      return this.http.delete<any>(url, {
        headers: this.headers(),
        params,
        observe: 'response'
      }).pipe(
        map(this.setToken)
      ).do(
        res => res,
        error => this.errorHandling(error)
      );
    }
}
