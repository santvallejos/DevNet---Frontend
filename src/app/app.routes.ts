import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundError } from 'rxjs';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './auth/recover-password/recover-password.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  //{ path: '**', component: NotFoundError },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'recover-password', component: RecoverPasswordComponent }
];
