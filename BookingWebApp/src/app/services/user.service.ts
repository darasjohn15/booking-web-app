import { map } from 'rxjs/operators';
import { User } from '../models/user';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    

    

    constructor(private http: HttpClient){
        
    }

    getUsers(): Observable<User[]> {

        let url = "http://127.0.0.1:8085/users"
        return this.http.get<User[]>(url);
    }

    getUser(userId: string | null): Observable<User> {

        let headers = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('x-access-token', localStorage.getItem('token')!)
        
        let url = "http://127.0.0.1:8085/user/" + userId + "/" + userId
        console.log('User Service: Token = ' + headers.get('x-access-token'))
        let results = this.http.get<User>(url, { headers: headers});
        console.log(results)
        return results
    }
}