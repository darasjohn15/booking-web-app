import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../models/response-message';
import { Message } from '../models/message';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    
    private baseUrl: string = "https://booking-app-apis.onrender.com/users"

    constructor(private http: HttpClient) { }

    getRequestHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        })
    }

    getUserId(): string {
        return localStorage.getItem('userId')!
    }

    getUser(userID: any): Observable<User> {
        console.log("Users Service: Getting User Info - " + this.getUserId())
        let url = this.baseUrl + "/" + userID
        return this.http.get<User>(url, { headers: this.getRequestHeaders() });
    }

    deactivateUser(): Observable<ResponseMessage> {
        console.log("Users Service: Deactivating User - " + this.getUserId())

        let request = {
            id: this.getUserId(),
            is_active: false
        }

        return this.http.put<ResponseMessage>(this.baseUrl, request, {headers: this.getRequestHeaders()}) 
    }

    createUser(user: any): Observable<ResponseMessage> {
        console.log('Users Service: Creating New User')
        return this.http.post<ResponseMessage>(this.baseUrl, user, {headers: this.getRequestHeaders()})
    }

    editUser(info: any): Observable<ResponseMessage> {
        console.log('Users Service: Editing User Info')

        return this.http.put<ResponseMessage>(this.baseUrl, info, { headers: this.getRequestHeaders() })
    }

    changePassword(input: any): Observable<ResponseMessage> {
        console.log('Users Service: Updating User Password')
        
        let request = {
            id: this.getUserId(),
            password: input
        }

        return this.http.put<ResponseMessage>(this.baseUrl, request, { headers: this.getRequestHeaders() })
    }
}