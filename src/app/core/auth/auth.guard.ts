import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        if (!user) {
          return false;
        }
        if (!user.emailVerified && user.providerId === 'password') {
          this.router.navigate(['auth/verify-email']).then();
        }
        if (next.data.roles) {
          for (const role of next.data.roles) {
            if (user.roles[role]) {
              return true;
            }
          }
          return false;
        } else {
          return user.roles.roleUser;
        }
      }),
      tap(result => {
        if (!result) {
          this.router.navigate(['auth/login']).then();
        }
      })
    );
  }

}
