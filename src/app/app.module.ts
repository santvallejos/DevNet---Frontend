import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecoverPasswordComponent } from './auth/recover-password/recover-password.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AppRoutingModule } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { PublicationComponent } from './pages/publication/publication.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, 
    LoginComponent,
    RegisterComponent, 
    RecoverPasswordComponent,
    MessagesComponent, 
    NotFoundComponent,
    ForgotPasswordComponent,
    PublicationComponent,
    SidebarComponent, // Remove duplicate import from imports
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    ToastrModule.forRoot(),
    RouterModule,
  ],
  bootstrap: [AppComponent],
  exports: [SidebarComponent]
})
export class AppModule { }