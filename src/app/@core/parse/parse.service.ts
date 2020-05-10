import { Injectable, Inject } from '@angular/core';
import * as Parse from 'parse';

export interface ParseServiceConfig {
  appId: string;
  javascriptKey: string;
  serverUrl: string;
}

@Injectable()
export class ParseService {

  constructor(@Inject('config') private config: ParseServiceConfig) {
    this.init();
  }

  init() {
    Parse.initialize(this.config.appId, this.config.javascriptKey);
    (Parse.serverURL as any) = this.config.serverUrl;
  }
}
