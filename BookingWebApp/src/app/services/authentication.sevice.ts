import { JWTHelper } from './../helpers/jwt.helper';
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

    private token: string | null
    private currentUser: string | null

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    }
    
    constructor(
        private http: HttpClient,
        private router: Router
    ){

        this.token = localStorage.getItem('token')
        this.currentUser = localStorage.getItem('userId')

    }

    public get tokenValue() {
        return this.token
    }

    public get currentUserId() {
        return this.currentUser
    }


    // needs to be a POST method, not Get
    // needs to send a JSON object with userName and Password
    // need to receive a JSON object with the token & userId
    login(userName: string | undefined, password: string | undefined): Observable<Token>{
        let url = "http://127.0.0.1:8085/login"
        return this.http.post<Token>(url, { userName, password })
        .pipe(map((token: Token) => {

            this.token = token.token!
            console.log('Authentication Service: ' + this.token)
            localStorage.setItem('token', token.token!)
            localStorage.setItem('userId', JWTHelper.GetCurrentUserId(token))
            
            
            return token
        }));
    }

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this.token = null
        this.currentUser = null
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