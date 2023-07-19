import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../models/response-message';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    
    private token?: string
    private userId?: string
    private requestHeaders: HttpHeaders
    private baseUrl: string = "http://127.0.0.1:8085/users/"

    constructor(private http: HttpClient){
        this.token = localStorage.getItem('token')!
        this.userId = localStorage.getItem('userId')!;

        this.requestHeaders = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('x-access-token', this.token!)
    }

    getUsers(): Observable<User[]> {
        console.log("Users Service: Getting All Users")
        return this.http.get<User[]>(this.baseUrl);
    }

    getCurrentUser(): Observable<User> {
        console.log("Users Service: Getting Current User Info")
        let url = this.baseUrl + this.userId + "/" + this.userId
        return this.http.get<User>(url, { headers: this.requestHeaders});
    }

    deactivateUser(): Observable<ResponseMessage> {
        console.log("Users Service: Deactivating User - " + this.userId)
        let url = this.baseUrl + this.userId
        return this.http.delete<ResponseMessage>(url, {headers: this.requestHeaders}) 
    }

    createUser(user: any): Observable<ResponseMessage> {
        console.log('Users Service: Creating New User')
        return this.http.post<ResponseMessage>(this.baseUrl, user, {headers: this.requestHeaders})
    }

    editUser(info: any): Observable<ResponseMessage> {
        console.log('Users Service: Editing User Info')
        let url = this.baseUrl + this.userId
        return this.http.put<ResponseMessage>(url, info, { headers: this.requestHeaders })
    }

    changePassword(info: any): Observable<ResponseMessage> {
        console.log('Users Service: Updating User Password')
        let url = this.baseUrl + 'password/' + this.userId
        return this.http.put<ResponseMessage>(url, info, { headers: this.requestHeaders })
    }
}