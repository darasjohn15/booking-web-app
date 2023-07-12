import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event';
import { ResponseMessage } from '../models/response-message';

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    
    private token?: string;
    private requestHeaders: HttpHeaders

    constructor(private http: HttpClient){
        this.token = localStorage.getItem('token')!
        
        this.requestHeaders = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('x-access-token', this.token)
    }

    getEvents(userId: string): Observable<Event[]> {
            
        let url = "http://127.0.0.1:8085/events/" + userId
        return this.http.get<Event[]>(url, {headers: this.requestHeaders});
    }

    getCurrentUserEvents(userId: string): Observable<Event[]> {

        let url = "http://127.0.0.1:8085/events/host/" + userId + "?host=" + userId
        return this.http.get<Event[]>(url, {headers: this.requestHeaders})
    }

    request(userId: string, eventId: string): Observable<ResponseMessage> {

        let url = "http://127.0.0.1:8085/events/request/" + userId + "?eventId=" + eventId + "?userId=" + userId
        console.log('Events Service: API endpoint = ' + url)
        let response = this.http.get<ResponseMessage>(url, {headers: this.requestHeaders});
        console.log(response)
        return response
    }
}