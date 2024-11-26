import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { LoginRequest, RegisterRequest, User } from '../core/models/user';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getUserRole: any;
  getUserEmail(): string {
    throw new Error('Method not implemented.');
  }
  base_url = environment.base_url;
  currentUser: User = new User();
  currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient, private router: Router,  @Inject(PLATFORM_ID) private platformId: Object, private toastr: ToastrService ) {
    if (isPlatformBrowser(this.platformId)) {
      const storedEmail = localStorage.getItem('userEmail');
      this.currentUser.email = storedEmail ? storedEmail : '';
    } else {
      this.currentUser.email = '';
    }
    this.currentUserSubject = new BehaviorSubject<User>(this.currentUser);
  }

  // Métodos auxiliares para manejo de localStorage
  private setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  private getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private clearStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

  // Métodos principales
  login(loginForm: LoginRequest){
    return this.http.post(`${this.base_url}/Auth/login`, loginForm)
    .pipe(
      map((response: any)=>{
        localStorage.setItem('userSession', JSON.stringify(response))
        localStorage.setItem('userEmail', loginForm.username);
        localStorage.setItem('userRole', response.data.role);
        return response;
      })
    );
  }


  register(registerData: RegisterRequest) {
    return this.http.post(`${this.base_url}/Auth/register`, registerData).subscribe({
      next: response => {
        // Almacenamos la respuesta y el email en localStorage
        localStorage.setItem('userSession', JSON.stringify(response));
        localStorage.setItem('userEmail', registerData.username);
        // Redirigimos a la página de inicio
        this.router.navigate(['pages/home']);
      },
      error: error => {
        debugger
        console.log(error);
        if (error.error && error.error.length >= 1) {
          // Aseguramos que error.error esté presente y tiene una longitud mayor o igual a 1
          error.error.forEach((errorMsg: { description: string }) => {
            this.toastr.error(errorMsg.description); // Mostrar mensaje de error
          });
        } else {
          // Manejo de error general si no tiene el formato esperado
          this.toastr.error('Ocurrió un error inesperado.');
        }
      }
    });
  }
  

  isLogged(): boolean {
    return this.getItem('userSession') !== null;
  }

  logout(): void {
    this.clearStorage();
    this.router.navigate(['auth/login']);
  }

  sendResetPasswordLink(email: string): Observable<any> {
    // Simulamos el envío de un correo para la recuperación de la contraseña
    return of({ message: 'Correo de recuperación enviado con éxito' }).pipe(
      // Si se recibe la respuesta de éxito, mostramos el mensaje con Toastr
      tap((response: { message: string | undefined; }) => {
        // Muestra un mensaje de éxito sin imprimir en consola
        this.toastr.success(response.message, 'Éxito', { timeOut: 3000 });
      })
    );
  }

  recoverPassword(email: string): Observable<any> {
    // Simulamos el envío de un correo para la recuperación de la contraseña
    return of({
      success: true,
      message: `Password recovery link sent to ${email}`,
    }).pipe(
      // Si la respuesta tiene éxito, mostramos el mensaje con Toastr
      tap(response => {
        if (response.success) {
          this.toastr.success(response.message, 'Éxito', { timeOut: 3000 });
        } else {
          this.toastr.error('Hubo un error al enviar el correo de recuperación.', 'Error', { timeOut: 3000 });
        }
      })
    );
  }

  getCurrentUserId(): string {
    const sessionData = localStorage.getItem('userSession');
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      return parsedData.data.userId.toString();
    }
    return "";
  }
}
