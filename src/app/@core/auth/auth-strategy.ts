import {
  NbAuthStrategy,
  NbAuthResult,
  NbAuthStrategyClass,
  NbAuthSimpleToken,
  NbPasswordAuthStrategyOptions,
  NbAuthStrategyOptions,
  NbAuthTokenClass,
} from '@nebular/auth';
import * as Parse from 'parse';
import { from, of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ParseService } from '../parse/parse.service';

interface Options {
  login?: {
    redirect: {
      success?: string
    }
  };
  logout?: {
    redirect: {
      success?: string
    }
  };
}

interface ParseAuthStrategyOptions extends NbAuthStrategyOptions, Options {
  token: {
    class: NbAuthTokenClass<NbAuthSimpleToken>
  };
}

@Injectable()
export class ParseAuthStrategy extends NbAuthStrategy {
  options: NbPasswordAuthStrategyOptions;

  constructor(parseService: ParseService) {
    super();
    parseService.init();
  }

  static setup(options?: Options): [NbAuthStrategyClass, ParseAuthStrategyOptions] {
    return [ParseAuthStrategy, {
      name: 'parse',
      token: {
        class: NbAuthSimpleToken
      },
      ...options,
    }];
  }

  authenticate(data: { email: string, password: string }) {
    const module: keyof Options = 'login';
    return from(Parse.User.logIn(data.email, data.password)).pipe(
      map((user) => {
        return new NbAuthResult(
          true,
          user,
          this.getOption(`${module}.redirect.success`),
          [],
          null,
          this.createToken(user.getSessionToken(), true)
        );
      }),
      catchError((err) => {
        return this.handleResponseError(err, module);
      }),
    );
  }

  logout() {
    const module: keyof Options = 'logout';
    return from(Parse.User.logOut())
      .pipe(
        map(() => {
          return new NbAuthResult(true, null, this.getOption(`${module}.redirect.success`));
        }),
        catchError((err) => {
          return this.handleResponseError(err, module);
        }),
      );
  }

  register() {
    console.error('Not implemented');
    return of(new NbAuthResult(false));
  }

  refreshToken() {
    console.error('Not implemented');
    return of(new NbAuthResult(false));
  }

  resetPassword() {
    console.error('Not implemented');
    return of(new NbAuthResult(false));
  }

  requestPassword() {
    console.error('Not implemented');
    return of(new NbAuthResult(false));
  }

  protected handleResponseError(err: any, _module: string): Observable<NbAuthResult> {
    console.error(err);
    const errors = ['Something went wrong.'];
    return of(
      new NbAuthResult(
        false,
        err,
        null,
        errors,
      ));
  }
}
