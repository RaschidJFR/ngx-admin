import { Injectable, Inject } from '@angular/core';
import { NbAuthService, NbTokenService, NB_AUTH_STRATEGIES } from '@nebular/auth';
import * as Parse from 'parse';
import { ParseService } from '../parse/parse.service';

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

  logout() {
    return super.logout('parse');
  }
}
