import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event';
import { ResponseMessage } from '../models/response-message';
import { Application } from '../models/application';

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    
    private baseUrl: string = "https://booking-app-apis.onrender.com/events"

    constructor(private http: HttpClient) { }

    getRequestHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        })
    }

    getEvents(filters: any = {}): Observable<Event[]> {
        console.log("Events Service: Getting Events with filters:", filters);

        let params = new HttpParams();
        for (let key in filters) {
            if (filters[key] !== null && filters[key] !== undefined) {
                params = params.set(key, filters[key]);
            }
        }

        return this.http.get<Event[]>(this.baseUrl, {
            headers: this.getRequestHeaders(),
            params: params
        });
    }

    getEvent(eventId: string): Observable<Event[]> {
        let url = this.baseUrl + "/" + eventId
        return this.http.get<Event[]>(url, {headers: this.getRequestHeaders()});
    }

    createEvent(eventData: any): Observable<ResponseMessage> {
        let url = this.baseUrl
        return this.http.post<ResponseMessage>(url, eventData, {headers: this.getRequestHeaders()})
    }

    getApplications(eventID: string){
        let url = this.baseUrl + "/applications/" + eventID
        return this.http.get<Application[]>(url, {headers: this.getRequestHeaders() })
    }

    getPerformerApplications(performerID: string){
        console.log('Events Service: Getting Performers Applications...')
        let url = this.baseUrl + "/applications/performer/" + performerID
        return this.http.get<Application[]>(url, {headers: this.getRequestHeaders() })
    }

    approveApplication(applicationData: any): Observable<ResponseMessage> {
        console.log('Events Service: Approving an Application...')
        let url = this.baseUrl + "/applications/approve"
        return this.http.post<ResponseMessage>(url, applicationData, {headers: this.getRequestHeaders()})
    }

    denyApplication(applicationData: any): Observable<ResponseMessage> {
        console.log('Events Service: Denying an Application...')
        let url = this.baseUrl + "/applications/deny"
        return this.http.post<ResponseMessage>(url, applicationData, {headers: this.getRequestHeaders()})
    }

    applyToEvent(applicationData: any): Observable<ResponseMessage> {
        console.log('Events Service: Applying to Event...')
        let url = this.baseUrl + "/application"
        return this.http.post<ResponseMessage>(url, applicationData, {headers: this.getRequestHeaders()})
    }
}