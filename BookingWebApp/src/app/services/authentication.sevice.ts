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
        console.log('Auth Serivce: Setting session token - ' + token)
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    clearToken(): void {
        localStorage.clear()
        console.log('Auth Service: Session token cleared.')
    }

    setUserId(token: string): void {
        let userId = JWTHelper.GetCurrentUserId(token)
        console.log('Auth Service: Setting session user - ' + userId)
        localStorage.setItem('userId', userId)
    }

    isLoggedIn(): boolean {
        
        if (this.getToken() !== null) {
            if(!JWTHelper.isTokenExpired(this.getToken()!)) {
                console.log("Auth Service: The token is valid.")
                return true
            }
            else {
                console.log("Auth Service: The token has expired.")
                this.logout();
                return false;
            }
        }
        else {
            console.log("Auth Service: The token is null.")
            return false;
        }
        
        
    }

    login({ userName, password }: any): Observable<any> {
        let url = "http://127.0.0.1:8085/login"
        return this.http.post<Token>(url, { userName, password })
            .pipe(map((token: Token) => {
    
                console.log('Authentication Service: ' + token)
                
                this.setToken(token.token!)
                this.setUserId(token.token!)
                
                return token
            }));
        }

    logout() {
        console.log('Auth Service: Logging out...')
        this.clearToken()
        this.router.navigate(['login']);
    } 
}