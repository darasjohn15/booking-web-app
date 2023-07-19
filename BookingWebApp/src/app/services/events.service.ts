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
    private baseUrl: string = "http://127.0.0.1:8085/events/"

    constructor(private http: HttpClient){
        this.token = localStorage.getItem('token')!;
        this.userId = localStorage.getItem('userId')!;

        this.requestHeaders = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('x-access-token', this.token!)
    }

    getEvents(userId: string): Observable<Event[]> {
        console.log("Events Service: Getting All Events.")
        let url = this.baseUrl + userId
        return this.http.get<Event[]>(url, {headers: this.requestHeaders});
    }

    getActiveEvents(): Observable<Event[]> {
        console.log("Events Service: Getting All Active Events...")
        let url = this.baseUrl + "active/" + this.userId
        return this.http.get<Event[]>(url, {headers: this.requestHeaders});
    }

    getEventDetails(eventId: string): Observable<Event> {
        console.log("Events Service: Getting Event Details for EventID = " + eventId)
        let url = this.baseUrl + "eventDetails/" + this.userId + "?eventId=" + eventId
        return this.http.get<Event>(url, {headers: this.requestHeaders})
    }

    getCurrentUserEvents(): Observable<Event[]> {
        console.log('Event Service: Getting Events created by User - ' + this.userId);
        let url = this.baseUrl + "host/" + this.userId + "?host=" + this.userId
        return this.http.get<Event[]>(url, {headers: this.requestHeaders})
    }

    cancelEvent(eventID: string): Observable<any> {
        console.log("Events Service: Cancelling Event " + eventID)
        let url = this.baseUrl + "cancel/" + this.userId + "?eventId=" + eventID
        return this.http.get(url, {headers: this.requestHeaders});
    }

    request(eventId: string): Observable<ResponseMessage> {
        console.log('Events Service: Requesting to perform at event.')
        let url = this.baseUrl + "request/" + this.userId + "?eventId=" + eventId + "&userId=" + this.userId
        return this.http.get<ResponseMessage>(url, {headers: this.requestHeaders});
    }

    removePerformer(eventId: string, performerId: string): Observable<ResponseMessage> {
        console.log('Removing Performer ' + performerId + ' from Event ' + eventId);
        let url = this.baseUrl + "remove/" + this.userId + "?eventId=" + eventId + "&userId=" + performerId
        return this.http.get<ResponseMessage>(url, {headers: this.requestHeaders})
    }

    approvePerformer(eventId: string, performerId: string): Observable<ResponseMessage> {
        console.log('Approving Performer ' + performerId + ' from Event ' + eventId);
        let url = this.baseUrl + "approve/" + this.userId + "?eventId=" + eventId + "&userId=" + performerId
        return this.http.get<ResponseMessage>(url, {headers: this.requestHeaders})
    }

    denyPerformer(eventId: string, performerId: string): Observable<ResponseMessage> {
        console.log('Denying Performer ' + performerId + ' from Event ' + eventId);
        let url = this.baseUrl + "deny/" + this.userId + "?eventId=" + eventId + "&userId=" + performerId
        return this.http.get<ResponseMessage>(url, {headers: this.requestHeaders})
    }

    createEvent(event: any): Observable<any> {
        console.log('Events Service: Creating New Event...')
        let url = this.baseUrl + this.userId
        return this.http.post(url, event, {headers: this.requestHeaders})
    }
}