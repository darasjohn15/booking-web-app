import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../models/response-message';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    
    private baseUrl: string = "http://127.0.0.1:8085/users/"

    constructor(private http: HttpClient) { }

    getRequestHeaders(): HttpHeaders {
        let requestHeaders = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('x-access-token', localStorage.getItem('token')!)

        return requestHeaders
    }

    getUserId(): string {
        return localStorage.getItem('userId')!
    }

    getUsers(): Observable<User[]> {
        console.log("Users Service: Getting All Users")
        return this.http.get<User[]>(this.baseUrl);
    }

    getCurrentUser(): Observable<User> {
        console.log("Users Service: Getting Current User Info")
        let url = this.baseUrl + this.getUserId() + "/" + this.getUserId()
        return this.http.get<User>(url, { headers: this.getRequestHeaders()});
    }

    getUser(otherUserId: string): Observable<User> {
        console.log("Users Service: Getting User Info - " + this.getUserId())
        let url = this.baseUrl + this.getUserId() + "/" + otherUserId
        return this.http.get<User>(url, { headers: this.getRequestHeaders() });
    }

    deactivateUser(): Observable<ResponseMessage> {
        console.log("Users Service: Deactivating User - " + this.getUserId())
        let url = this.baseUrl + this.getUserId()
        return this.http.delete<ResponseMessage>(url, {headers: this.getRequestHeaders()}) 
    }

    createUser(user: any): Observable<ResponseMessage> {
        console.log('Users Service: Creating New User')
        return this.http.post<ResponseMessage>(this.baseUrl, user, {headers: this.getRequestHeaders()})
    }

    editUser(info: any): Observable<ResponseMessage> {
        console.log('Users Service: Editing User Info')
        let url = this.baseUrl + this.getUserId()
        return this.http.put<ResponseMessage>(url, info, { headers: this.getRequestHeaders() })
    }

    changePassword(info: any): Observable<ResponseMessage> {
        console.log('Users Service: Updating User Password')
        let url = this.baseUrl + 'password/' + this.getUserId()
        return this.http.put<ResponseMessage>(url, info, { headers: this.getRequestHeaders() })
    }
}