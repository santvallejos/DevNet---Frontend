import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginRequest } from './loginRequest'; // Import the LoginRequest model if required

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerApiUrl = 'https://api.tuapp.com/auth/register';
  private loginApiUrl = 'https://api.tuapp.com/auth/login';
  private recoverPasswordApiUrl = 'https://api.tuapp.com/auth/recover-password'; // Add this for actual API endpoint

  constructor() {}

  // Método simulado para el registro
  register(data: LoginRequest): Observable<any> {
    // Simulando respuesta exitosa del backend con un objeto de ejemplo
    return of({
      success: true,
      message: 'Registro exitoso',
      data: { firstName: data.get('firstName'), lastName: data.get('lastName') },
    });

    // Descomentar cuando el backend real esté disponible:
    /*
    return this.http.post<any>(this.registerApiUrl, data);
    */
  }

  // Método simulado para el login
  login(credentials: LoginRequest): Observable<any> {
    // Simulando la respuesta del backend con un objeto de ejemplo
    return of({ token: 'fake-jwt-token' }); // Simula una respuesta de login

    // Para cuando el backend esté listo:
    /*
    return this.http.post<any>(this.loginApiUrl, credentials);
    */
  }

  // Método para simular la recuperación de contraseña
  recoverPassword(email: string): Observable<any> {
    // Simulando respuesta exitosa del backend
    return of({
      success: true,
      message: `Password recovery link sent to ${email}`,
    });

    // Descomentar cuando el backend real esté disponible:
    /*
    return this.http.post<any>(this.recoverPasswordApiUrl, { email });
    */
  }
}
