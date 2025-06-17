import { JWTHelper } from './../helpers/jwt.helper';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Token } from '../models/token';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface DecodedToken {
    user_id: string;
    role: string;
    exp: number;
  }

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private decodedToken: DecodedToken | null = null;
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

    getRole(): string | null {
        const token = this.getToken();
        if (!token) return null;
    
        return JWTHelper.GetCurrentRole(token);
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

    getUserId(): string {
        console.log("Auth Service: Getting User ID");
        let token = localStorage.getItem('token')!;
        return JWTHelper.GetCurrentUserId(token);
    }

    setRole(token: string): void {
        let role = JWTHelper.GetCurrentRole(token)
        console.log('Auth Service: Setting session user role - ' + role)
        localStorage.setItem('role', role)
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

    login({ email, password }: any): Observable<any> {
        let url = "http://127.0.0.1:8085/login"
        return this.http.post<Token>(url, { email, password }).pipe(
            tap(response => {
                const token = response.token!;
                localStorage.setItem('token', token);

                console.log('Authentication Service: ' + token)
                
                this.setToken(token)
                this.setUserId(token)
                this.setRole(token)
                
                return token
            })
        );
    }

    logout() {
        console.log('Auth Service: Logging out...')
        this.clearToken()
        this.router.navigate(['login']);
    } 
}