import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecoverPasswordComponent } from './auth/recover-password/recover-password.component';
import { RegisterComponent } from './auth/register/register.component';
import { Router } from '@angular/router'; 

import { routes } from './app.routes'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, 
    LoginComponent,
    RegisterComponent, 
    RecoverPasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    Router,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
