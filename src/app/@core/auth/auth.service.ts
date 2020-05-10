import { Injectable, Inject } from '@angular/core';
import { NbAuthService, NbTokenService, NB_AUTH_STRATEGIES, NbAuthResult } from '@nebular/auth';
import * as Parse from 'parse';
import { ParseService } from '../parse/parse.service';
import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService extends NbAuthService {

  constructor(
    protected router: Router,
    protected parseService: ParseService,
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
    observable$.pipe(take(1)).subscribe(result => {
      if (result.isSuccess()) {
        this.tokenService.clear();
        this.router.navigate([result.getRedirect()]);
      }
    });

    return observable$;
  }
}
