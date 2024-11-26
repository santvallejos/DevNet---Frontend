import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, of, tap, map } from 'rxjs';
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
  isAuthenticated(): boolean {
    throw new Error('Method not implemented.');
  }
  private base_url = environment.base_url;
  private currentUser: User = new User();
  private currentUserSubject: BehaviorSubject<User>;
  private authStateInitialized = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastr: ToastrService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(this.currentUser);
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userSession = this.getItem('userSession');
      const userEmail = this.getItem('userEmail');
      
      if (userSession) {
        this.currentUser.email = userEmail || '';
        this.currentUserSubject.next(this.currentUser);
      }
    }
    this.authStateInitialized.next(true);
  }

  // Método para esperar a que se inicialice el estado de autenticación
  waitForAuthInit(): Observable<boolean> {
    return this.authStateInitialized.asObservable();
  }

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

  login(loginForm: LoginRequest) {
    return this.http.post(`${this.base_url}/Auth/login`, loginForm).pipe(
      map((response: any) => {
        this.setItem('userSession', JSON.stringify(response));
        this.setItem('userEmail', loginForm.username);
        this.setItem('userRole', response.data.role);
        this.currentUser.email = loginForm.username;
        this.currentUserSubject.next(this.currentUser);
        return response;
      })
    );
  }

  register(registerData: RegisterRequest) {
    return this.http.post(`${this.base_url}/Auth/register`, registerData).pipe(
      tap({
        next: (response: any) => {
          this.setItem('userSession', JSON.stringify(response));
          this.setItem('userEmail', registerData.username);
          this.currentUser.email = registerData.username;
          this.currentUserSubject.next(this.currentUser);
          this.router.navigate(['pages/home']);
        },
        error: (error) => {
          if (error.error?.length >= 1) {
            error.error.forEach((errorMsg: { description: string }) => {
              this.toastr.error(errorMsg.description);
            });
          } else {
            this.toastr.error('Ocurrió un error inesperado.');
          }
        }
      })
    );
  }

  isLogged(): boolean {
    return isPlatformBrowser(this.platformId) ? !!this.getItem('userSession') : false;
  }

  logout(): void {
    this.clearStorage();
    this.currentUser = new User();
    this.currentUserSubject.next(this.currentUser);
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
