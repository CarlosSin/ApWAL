import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/']);
      return false;
    }

    const allowedRoles = route.data['roles'] as string[];
    const userRoles = this.authService.getRoles();

    if (allowedRoles && !allowedRoles.some(r => userRoles.includes(r))) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}
