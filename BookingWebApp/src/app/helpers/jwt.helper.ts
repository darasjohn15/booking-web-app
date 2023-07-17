import { Token } from './../models/token';
import jwtDecode, * as jwt_decode from "jwt-decode";
import { JWTpayload } from '../models/JWTpayload';

export class JWTHelper {
    static GetCurrentUserId(token: string): string {
        let payload = jwtDecode<JWTpayload>(token)

        return payload.user!
    }

    static isTokenExpired(token: string): boolean {
        let payload = jwtDecode<JWTpayload>(token)

        return (Math.floor((new Date).getTime() / 1000)) >= payload.exp!
    }
}