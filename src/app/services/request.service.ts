import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
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
      const postObservable = this.http.post<any>(url, body, {
        headers: this.headers(),
        observe: 'response'
      }).pipe(
        map(this.setToken)
      );

      postObservable.subscribe(
        res => res,
        error => this.errorHandling(error)
      );

      return postObservable;
    }

    get(url: string, params?: any) {
      const getObservable = this.http.get<any>(url, {
        params,
        headers: this.headers(),
        observe: 'response'
      }).pipe(
        map(this.setToken)
      );

      getObservable.subscribe(
        res => res,
        error => this.errorHandling(error)
      );

      return getObservable;
    }

    put(url: string, body: any) {
      const putObservable = this.http.put<any>(url, body, {
        headers: this.headers(),
        observe: 'response'
      }).pipe(map(this.setToken));

      putObservable.subscribe(
        res => res,
        error => this.errorHandling(error)
      );

      return putObservable;
    }

    delete(url: string, params?: any) {
      const deleteObservable = this.http.delete<any>(url, {
        headers: this.headers(),
        params,
        observe: 'response'
      }).pipe(map(this.setToken));

      deleteObservable.subscribe(
        res => res,
        error => this.errorHandling(error)
      );

      return deleteObservable;
    }
}
