import { map } from 'rxjs/operators';
import { User } from '../models/user';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    

    headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZGFyYXNqb2huc29uIiwiZXhwIjoxNjg3NDUzMzE2fQ.V4d0Wc7Cbn81auwJwNQonjBN9RisCVAVIwA37WHjUUA")

    constructor(private http: HttpClient){
        
    }

    getUsers(): Observable<User[]> {

        let url = "http://127.0.0.1:8085/users"
        return this.http.get<User[]>(url);
    }

    getUser(userId: string): Observable<User> {
        
        let url = "http://127.0.0.1:8085/user/" + userId + "/" + userId
        let results = this.http.get<User>(url, { headers: this.headers});
        console.log(results)
        return results
    }
}