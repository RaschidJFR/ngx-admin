import { Injectable, Inject } from '@angular/core';
import { NbAuthService, NbTokenService, NB_AUTH_STRATEGIES, NbAuthResult } from '@nebular/auth';
import * as Parse from 'parse';
import { ParseService } from '../parse/parse.service';
import { take, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ParseAuthStrategy } from './auth-strategy';

@Injectable()
export class AuthService extends NbAuthService {

  constructor(
    protected router: Router,
    protected parseService: ParseService,
    protected strategy: ParseAuthStrategy,
    protected tokenService: NbTokenService,
    @Inject(NB_AUTH_STRATEGIES) protected strategies) {
    super(tokenService, strategies);
    parseService.init();
  }

  get user() {
    return Parse.User.current();
  }

  logout(): Observable<NbAuthResult> {
    this.tokenService.clear();
    const observable$ = super.logout('parse');

    // if noone subscribes the observer does not return
    observable$
      .pipe(
        take(1),
        catchError(e => {
          console.error(e);
          const response = e.message || e.toString || e;
          return of(new NbAuthResult(
            true,
            response,
            this.strategy.getOption(`${module}.redirect.success`)
          ));
        })
      ).subscribe(result => {
        this.tokenService.clear();
        if (result.getRedirect()) {
          this.router.navigate([result.getRedirect()]);
        }
      });

    return observable$;
  }
}
