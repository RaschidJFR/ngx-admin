import { Injectable, Inject } from '@angular/core';
import { NbAuthService, NbTokenService, NB_AUTH_STRATEGIES, NbAuthResult } from '@nebular/auth';
import * as Parse from 'parse';
import { ParseService } from '../parse/parse.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService extends NbAuthService {

  constructor(
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
    return super.logout('parse')
      .pipe(
        tap((result) => {
          if (result.isSuccess())
            this.tokenService.clear();
        })
      );
  }
}
