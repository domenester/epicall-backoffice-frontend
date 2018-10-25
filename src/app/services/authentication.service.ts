import { Injectable } from '@angular/core';
import { api as config } from '../config/configs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    // login(username: string, password: string) {
    //     return this.http.post<any>(`${config.url}/login`, { username, password })
    //         .pipe(map(response => {
    //             if (response) {
    //                 console.log(response)
    //                 response = JSON.parse(response)
    //                 console.log(response)
    //                 localStorage.setItem('currentUser', JSON.stringify(response.data));
    //             }
    //             return response.data;
    //         }));
    // }

    login(username: string, password: string) {
        return this.http.post<RespostaHttp>(`${config.url}/login`, { username, password }).toPromise().then((response) => {
            console.log(response);
            if (response) {
                localStorage.setItem('currentUser', JSON.stringify(response.data));
            };
            if (response.error) {
                return response;
            }
            return response.data;
        }).catch((error) => {
            console.log(error);
            return error;
        });
        // return this.http.post<RespostaHttp>(`${config.url}/login`, { username, password })
        //     .pipe(map(response => {
        //         if (response) {
        //             localStorage.setItem('currentUser', JSON.stringify(response.data));
        //         }
        //         return response.data;
        //     }));
    }


    logout() {
        localStorage.removeItem('currentUser');
    }
}

declare type RespostaHttp = {
    /**
     * Representa os dados retornados da requisição
     */
    data: any;

    /**
     * Representa os dados de erro
     */
    error: any;
}