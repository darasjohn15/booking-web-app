import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseMessage } from "../models/response-message";
import { Observable } from "rxjs";
import { Application } from "../models/application";

@Injectable({
    providedIn: 'root'
})
export class ApplicationsService {
    private baseUrl: string = "https://booking-app-apis.onrender.com/applications"
    
        constructor(private http: HttpClient) { }
    
        getRequestHeaders(): HttpHeaders {
            return new HttpHeaders({
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            })
        }

        getApplication(applicationId: number): Observable<Application> {
            let url = this.baseUrl + "/" + applicationId;
            return this.http.get<Application>(url, {headers: this.getRequestHeaders()});
        }

        getApplications(filters: any = {}): Observable<Application[]> {
            let params = new HttpParams();
            for(let key in filters) {
                if (filters[key] !== null && filters[key] !== undefined) {
                    params = params.set(key, filters[key]);
                }
            }

            return this.http.get<Application[]>(this.baseUrl, {
                headers: this.getRequestHeaders(),
                params: params
            });
        }

        createApplication(request: Partial<Application>): Observable<ResponseMessage> {
            return this.http.post<ResponseMessage>(this.baseUrl, request, { headers: this.getRequestHeaders() })
        }

        updateApplication(request: Partial<Application>): Observable<Application> {
            return this.http.put<Application>(this.baseUrl, request, { headers: this.getRequestHeaders() });
        }
}