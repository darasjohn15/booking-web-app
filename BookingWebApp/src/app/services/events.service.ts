import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    
    constructor(private http: HttpClient){

    }

    getEvents(userId: string): Observable<Event[]> {
        let requestHeaders = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('x-access-token', localStorage.getItem('token')!)
            
        let url = "http://127.0.0.1:8085/events/" + userId
        let results = this.http.get<Event[]>(url, {headers: requestHeaders});
        console.log('EventsService: ' + results)
        return results
    }
}