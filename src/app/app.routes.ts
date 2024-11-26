import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './auth/recover-password/recover-password.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { loginGuard } from './core/guards/login.guard';
import { accessGuard } from './core/guards/access.guard';
import { MessagesComponent } from './pages/messages/messages.component';
import { ProfileComponent } from './pages/profile/profile.component';



export const routes: Routes = [

  {
    path: 'auth',
    canActivate: [loginGuard],
    children: [
      { 
        path: 'login', 
        component: LoginComponent 
      },
      { 
        path: 'register', 
        component: RegisterComponent 
      },
      { 
        path: 'forgot-password', 
        component: ForgotPasswordComponent 
      }
    ]
  },
  {
    path: 'pages',
    canActivate: [accessGuard],
    children: [
      { 
        path: 'home', 
        component: HomeComponent 
      },
      {
        path: 'messages',
        component: MessagesComponent
      },
      {
        path: 'profile',
        component: ProfileComponent, 
      }
    ]
  },
  { 
    path: 'recover-password', 
    component: RecoverPasswordComponent 
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { 
    path: '**', 
    component: NotFoundComponent 
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }