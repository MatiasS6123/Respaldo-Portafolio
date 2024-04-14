import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserService } from '../Service/user.service';
@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}
  
    canActivate(): Observable<boolean> {
        return this.userService.renewTokenIfNeeded().pipe(
          map(success => {
            if (success) {
              return true;
            } else {
              this.userService.logout();
              this.router.navigate(['/login']); // Redirige a la página de inicio de sesión si la renovación del token falla
              return false;
            }
          })
        );
      }
  }