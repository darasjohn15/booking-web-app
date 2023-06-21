import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Token } from '../models/token';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private tokenSubject: BehaviorSubject<Token | null>
    public token: Observable<Token | null>

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    }
    
    constructor(
        private http: HttpClient,
        private router: Router){
        this.tokenSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('token')!))
        this.token = this.tokenSubject.asObservable();

    }

    public get tokenValue() {
        return this.tokenSubject.value
    }


    // needs to be a POST method, not Get
    // needs to send a JSON object with userName and Password
    // need to receive a JSON object with the token & userId
    login(userName: string | undefined, password: string | undefined): Observable<Token>{
        let url = "http://127.0.0.1:8085/login"
        return this.http.post<Token>(url, { userName, password })
        .pipe(map((token: any) => {
            localStorage.setItem('token', JSON.stringify(token))
            this.tokenSubject.next(token)
            return token
        }));
    }

    logout() {
        localStorage.removeItem('token')
        this.tokenSubject.next(null)
        this.router.navigate(['Login'])
    }

    isLoggedIn() {
        if (localStorage.getItem('token')) {
            return true
        }

        this.router.navigate(['Login'])
        return false
    }
}