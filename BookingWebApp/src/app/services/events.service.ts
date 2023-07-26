import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event';
import { ResponseMessage } from '../models/response-message';

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    
    private baseUrl: string = "http://127.0.0.1:8085/events/"

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

    getEvents(userId: string): Observable<Event[]> {
        console.log("Events Service: Getting All Events.")
        let url = this.baseUrl + userId
        return this.http.get<Event[]>(url, {headers: this.getRequestHeaders()});
    }

    getActiveEvents(): Observable<Event[]> {
        console.log("Events Service: Getting All Active Events...")
        let url = this.baseUrl + "active/" + this.getUserId()
        return this.http.get<Event[]>(url, {headers: this.getRequestHeaders()});
    }

    getEventDetails(eventId: string): Observable<Event> {
        console.log("Events Service: Getting Event Details for EventID = " + eventId)
        let url = this.baseUrl + this.getUserId() + "/" + eventId
        return this.http.get<Event>(url, {headers: this.getRequestHeaders()})
    }

    getCurrentUserEvents(): Observable<Event[]> {
        console.log('Event Service: Getting Events created by User - ' + this.getUserId());
        let url = this.baseUrl + "host/" + this.getUserId() + "?host=" + this.getUserId()
        return this.http.get<Event[]>(url, {headers: this.getRequestHeaders()})
    }

    cancelEvent(eventID: string): Observable<ResponseMessage> {
        console.log("Events Service: Cancelling Event " + eventID)
        let url = this.baseUrl + "cancel/" + this.getUserId() + "/" + eventID
        return this.http.get(url, {headers: this.getRequestHeaders()});
    }

    activateEvent(eventID: string): Observable<ResponseMessage> {
        console.log("Events Service: Activating Event " + eventID)
        let url = this.baseUrl + "activate/" + this.getUserId() + "/" + eventID
        return this.http.get(url, {headers: this.getRequestHeaders()});
    }

    request(eventId: string): Observable<ResponseMessage> {
        console.log('Events Service: Requesting to perform at event.')
        let url = this.baseUrl + "request/" + this.getUserId() + "?eventId=" + eventId + "&userId=" + this.getUserId()
        return this.http.get<ResponseMessage>(url, {headers: this.getRequestHeaders()});
    }

    removePerformer(eventId: string, performerId: string): Observable<ResponseMessage> {
        console.log('Removing Performer ' + performerId + ' from Event ' + eventId);
        let url = this.baseUrl + "remove/" + this.getUserId() + "?eventId=" + eventId + "&userId=" + performerId
        return this.http.get<ResponseMessage>(url, {headers: this.getRequestHeaders()})
    }

    approvePerformer(eventId: string, performerId: string): Observable<ResponseMessage> {
        console.log('Approving Performer ' + performerId + ' from Event ' + eventId);
        let url = this.baseUrl + "approve/" + this.getUserId() + "?eventId=" + eventId + "&userId=" + performerId
        return this.http.get<ResponseMessage>(url, {headers: this.getRequestHeaders()})
    }

    denyPerformer(eventId: string, performerId: string): Observable<ResponseMessage> {
        console.log('Denying Performer ' + performerId + ' from Event ' + eventId);
        let url = this.baseUrl + "deny/" + this.getUserId() + "?eventId=" + eventId + "&userId=" + performerId
        return this.http.get<ResponseMessage>(url, {headers: this.getRequestHeaders()})
    }

    cancelPerformance(eventId: string): Observable<ResponseMessage> {
        console.log('Cancelling performance for Event - ' + eventId)
        let url = this.baseUrl + "remove/" + this.getUserId() + "?eventId=" + eventId + "&userId=" + this.getUserId()
        return this.http.get<ResponseMessage>(url, { headers: this.getRequestHeaders() })
    }

    createEvent(event: any): Observable<ResponseMessage> {
        console.log('Events Service: Creating New Event...')
        let url = this.baseUrl + this.getUserId()
        return this.http.post<ResponseMessage>(url, event, {headers: this.getRequestHeaders()})
    }
}