import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    return this.auth.isAuthenticated()
      .pipe(
        map(isAuthenticated => {
          return isAuthenticated ? isAuthenticated : this.router.parseUrl('/auth/login');
        })
      );
  }

}
