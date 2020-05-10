import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParseAuthStrategy } from './auth-strategy';
import { AuthService } from './auth.service';



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    ParseAuthStrategy
  ]
})
export class AuthModule { }
