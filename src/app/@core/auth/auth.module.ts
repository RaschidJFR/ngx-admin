import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParseAuthStrategy } from './auth-strategy';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    ParseAuthStrategy,
    AuthGuard,
  ]
})
export class AuthModule { }
