import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { global } from './global';

@Injectable()
export class CategoryService {

    public url: string;

    constructor(
        // tslint:disable-next-line: variable-name
        public _http: HttpClient
    ) {
        this.url = global.url;
    }

    create(token, category): Observable<any> {
        const json = JSON.stringify(category);
        const params = 'json=' + json;
        // tslint:disable-next-line: prefer-const
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);

        // tslint:disable-next-line: object-literal-shorthand
        return this._http.post(this.url + 'category', params, {headers: headers});
    }

    getCategories(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        // tslint:disable-next-line: object-literal-shorthand
        return this._http.get(this.url + 'category', {headers: headers});
    }

}
