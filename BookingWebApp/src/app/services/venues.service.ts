import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venue } from '../models/venue';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VenuesService {
    
    private baseUrl: string = `${environment.apiBaseUrl}/venues`;

    constructor(private http: HttpClient) { }

    getRequestHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        })
    }

    getVenues(): Observable<Venue[]> {
        console.log("Venues Service: Getting Venues");

        return this.http.get<Venue[]>(this.baseUrl, {
            headers: this.getRequestHeaders()
        });
    }
}