import { Routes, provideRouter } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponent } from './auth/not-found/not-found.component';

// Define las rutas
export const routes: Routes = [
  { path: '', component: LoginComponent }, // Ruta raíz para el Login
  { path: 'register', component: RegisterComponent }, // Ruta para el Registro
  { path: 'home', component: HomeComponent }, // Ruta para el Home
  { path: '**', redirectTo: '' } // Redirigir a Login si no se encuentra la ruta
];

export const appRoutingProviders = [provideRouter(routes)];


