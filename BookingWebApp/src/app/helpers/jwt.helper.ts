import jwtDecode, * as jwt_decode from "jwt-decode";
import { JWTpayload } from '../models/JWTpayload';

export class JWTHelper {
    static GetCurrentUserId(token: string): string {
        let payload = jwtDecode<JWTpayload>(token)
        return payload.user_id!
    }

    static GetCurrentRole(token: string): string {
        let payload = jwtDecode<JWTpayload>(token)
        return payload.role!
    }

    static isTokenExpired(token: string): boolean {
        let payload = jwtDecode<JWTpayload>(token)
        return (Math.floor((new Date).getTime() / 1000)) >= payload.exp!
    }
}