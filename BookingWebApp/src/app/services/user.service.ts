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

    getUsers(): Observable<User[]> {
        console.log("Users Service: Getting All Users")
        return this.http.get<User[]>(this.baseUrl);
    }

    getCurrentUser(): Observable<User> {
        console.log("Users Service: Getting Current User Info")
        let url = this.baseUrl + this.getUserId() + "/" + this.getUserId()
        return this.http.get<User>(url, { headers: this.getRequestHeaders()});
    }

    getUser(userId: string): Observable<User> {
        console.log("Users Service: Getting User Info - " + userId)
        let url = this.baseUrl + "/" + userId
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

    getMessages(): Observable<Message[]> {
        console.log('Users Service: Getting User Messages')
        let url = this.baseUrl + 'messages/' + this.getUserId()
        return this.http.get<Message[]>(url, { headers: this.getRequestHeaders() })
    }

    sendMessage(message: Message): Observable<ResponseMessage> {
        console.log('Users Service: Sending Message to User - ' + message.userId )
        let url = this.baseUrl + 'messages/' + this.getUserId()
        return this.http.post<ResponseMessage>(url, message, { headers: this.getRequestHeaders() })
    }

    readMessage(id: string): Observable<ResponseMessage> {
        console.log('Users Service: Reading Message - ' + id )
        let url = this.baseUrl + 'messages/read/' + this.getUserId() + '/' + id
        return this.http.get<ResponseMessage>(url, { headers: this.getRequestHeaders() })
    }
}