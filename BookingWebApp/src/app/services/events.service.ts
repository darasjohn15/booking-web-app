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
    private userId?: string;
    private requestHeaders: HttpHeaders

    constructor(private http: HttpClient){
        this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZGFyYXNqb2huc29uIiwiZXhwIjoxNjg5MzYwODk3fQ.4Ed79IZ7fSP9bq2TcCbC4Amsq4NmR74V1sORl_XpL1A"
        this.userId = "darasjohnson"
        this.requestHeaders = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('x-access-token', this.token)
    }

    getEvents(userId: string): Observable<Event[]> {
        console.log("We're Here")
        let url = "http://127.0.0.1:8085/events/" + userId
        return this.http.get<Event[]>(url, {headers: this.requestHeaders});
    }

    getActiveEvents(): Observable<Event[]> {
        console.log("Events Service: Getting All Active Events...")
        let url = "http://127.0.0.1:8085/events/active/" + this.userId
        return this.http.get<Event[]>(url, {headers: this.requestHeaders});
    }

    cancelEvent(eventID: string): Observable<any> {
        console.log("Events Service: Cancelling Event " + eventID)
        let url = "http://127.0.0.1:8085/events/cancel/" + this.userId + "?eventId=" + eventID
        return this.http.get(url, {headers: this.requestHeaders});
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

    createEvent(event: any): Observable<any> {
        console.log('Events Service: Creating New Event...')
        console.log(event)
        let url = "http://127.0.0.1:8085/events/" + this.userId
        return this.http.post(url, event, {headers: this.requestHeaders})
    }
}