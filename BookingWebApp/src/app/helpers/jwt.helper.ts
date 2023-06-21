import { User } from './../../../../../DragAppFront_End/drag-booking-app/src/app/models/user';
import { Token } from './../models/token';
import jwtDecode, * as jwt_decode from "jwt-decode";
import { JWTpayload } from '../models/JWTpayload';

export class JWTHelper {
    static GetCurrentUserId(token: Token): string {
        let tokenString = token.token
        
        //Decode(tokenString)
        let payload = jwtDecode<JWTpayload>(tokenString!)

        return payload.user!
    }
}