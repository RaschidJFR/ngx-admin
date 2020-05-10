import { NgModule, ModuleWithProviders } from '@angular/core';
import { ParseService, ParseServiceConfig } from './parse.service';

@NgModule()
export class ParseModule {
  static forRoot(config: ParseServiceConfig): ModuleWithProviders<ParseModule> {
    return {
      ngModule: ParseModule,
      providers: [
        ParseService,
        { provide: 'config', useValue: config },
      ],
    };
  }
}
