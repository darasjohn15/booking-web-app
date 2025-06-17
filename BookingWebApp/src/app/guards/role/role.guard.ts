import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.sevice';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(AuthenticationService);
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as string[];
  const userRole = auth.getRole();

  if (userRole && allowedRoles.includes(userRole)) {
    return true;
  }

  console.log("Role Guard: Allowed Roles:", allowedRoles);
  console.log("Role Guard: User Role:", userRole);

  // Redirect based on role or kick to login
  if (userRole) {
    router.navigate([`/${userRole}`]); // e.g., /performer or /host
  } else {
    router.navigate(['/login']);
  }

  return false;
};