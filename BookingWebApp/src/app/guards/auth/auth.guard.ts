import { AuthenticationService } from 'src/app/services/authentication.sevice';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export const authGuard = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
        return inject(AuthenticationService).isLoggedIn()
}