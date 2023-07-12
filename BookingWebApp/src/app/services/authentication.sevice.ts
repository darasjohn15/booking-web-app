import { JWTHelper } from './../helpers/jwt.helper';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Token } from '../models/token';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    }
    
    constructor(private router: Router, private http: HttpClient) {}

    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isLoggedIn() {
        return this.getToken() !== null;
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    }
    
      login({ userName, password }: any): Observable<any> {
        let url = "http://127.0.0.1:8085/login"
        return this.http.post<Token>(url, { userName, password })
         .pipe(map((token: Token) => {

             console.log('Authentication Service: ' + token)
             this.setToken(token.token!)
             localStorage.setItem('userId', JWTHelper.GetCurrentUserId(token))
            
            
             return token
         }));
      }
    }


    // needs to be a POST method, not Get
    // needs to send a JSON object with userName and Password
    // need to receive a JSON object with the token & userId
    // login(userName: string | undefined, password: string | undefined): Observable<Token>{
    //     let url = "http://127.0.0.1:8085/login"
    //     return this.http.post<Token>(url, { userName, password })
    //     .pipe(map((token: Token) => {

    //         this.token = token.token!
    //         console.log('Authentication Service: ' + this.token)
    //         localStorage.setItem('token', token.token!)
    //         localStorage.setItem('userId', JWTHelper.GetCurrentUserId(token))
            
            
    //         return token
    //     }));
    // }

    // logout() {
    //     localStorage.removeItem('token')
    //     localStorage.removeItem('userId')
    //     this.token = null
    //     this.currentUser = null
    //     this.router.navigate(['Login'])
    // }

    // isLoggedIn() {
    //     if (localStorage.getItem('token')) {
    //         return true
    //     }
        
    //     return false
    // }
//}