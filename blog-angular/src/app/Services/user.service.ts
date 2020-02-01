import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {

    public url: string;
    public identity;
    public token;

    constructor(
        // tslint:disable-next-line: variable-name
        public _http: HttpClient
    ) {
        this.url = global.url;
    }

    test() {
        return 'Hola mundo desde un servicio!!!';
    }

    register(user): Observable<any> {
        // tslint:disable-next-line: prefer-const
        let json = JSON.stringify(user);
        // tslint:disable-next-line: prefer-const
        let params = 'json=' + json;

        // tslint:disable-next-line: prefer-const
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        // tslint:disable-next-line: object-literal-shorthand
        return this._http.post(this.url + 'register', params, {headers: headers});
    }

    signup(user, gettoken = null): Observable<any> {
        if (gettoken != null) {
            user.gettoken = 'true';
        }

        // tslint:disable-next-line: prefer-const
        let json = JSON.stringify(user);
        // tslint:disable-next-line: prefer-const
        let params = 'json=' + json;
        // tslint:disable-next-line: prefer-const
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        // tslint:disable-next-line: object-literal-shorthand
        return this._http.post(this.url + 'login', params, {headers: headers});
    }

    getIdentity() {
        // tslint:disable-next-line: prefer-const
        let identity = JSON.parse(localStorage.getItem('identity'));

        // tslint:disable-next-line: triple-equals
        if ( identity && identity != 'undefined') {
         this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken() {
        // tslint:disable-next-line: prefer-const
        let token = localStorage.getItem('token');
        // tslint:disable-next-line: triple-equals
        if ( token && token != 'undefined') {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;

    }
}
