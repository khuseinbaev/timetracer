/***
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user.pipe(
      take(1),
      map(user => user && this.authService.canWrite(user)),
      tap(isAdmin => {
        if (!isAdmin) {
          console.error('Access denied - Admins only');
        }
      })
    );
  }

}
*/
