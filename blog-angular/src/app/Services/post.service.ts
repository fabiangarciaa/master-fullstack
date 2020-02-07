import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { Post } from '../models/post';

@Injectable()
export class PostService {

    public url: string;

    constructor(
        // tslint:disable-next-line: variable-name
        public _http: HttpClient
    ) {
        this.url = global.url;
    }

    pruebas() {
        return ' Hola desde el servicio de POST ';
    }

    create(token, post): Observable<any> {
        const json = JSON.stringify(post);
        const params = 'json=' + json;

        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);

        // tslint:disable-next-line: object-literal-shorthand
        return this._http.post(this.url + 'post', params, {headers: headers});
    }

    getPosts(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        // tslint:disable-next-line: object-literal-shorthand
        return this._http.get(this.url + 'post', {headers: headers});
    }

    getPost(id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        // tslint:disable-next-line: object-literal-shorthand
        return this._http.get(this.url + 'post/' + id, {headers: headers});
    }

    update(token, post, id): Observable<any> {
        const json = JSON.stringify(post);
        const params = 'json=' + json;

        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);

        // tslint:disable-next-line: object-literal-shorthand
        return this._http.put(this.url + 'post/' + id, params, {headers: headers});
    }

    delete(token, id) {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
        return this._http.delete(this.url + 'post/' + id, {headers});
    }


}
