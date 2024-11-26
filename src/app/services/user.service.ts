import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ExecOptions } from 'node:child_process';
import { Console } from 'node:console';
import { HeaderInjector } from './headerInjector.service';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = `${environment.base_url}/Users`;  // Usar base_url del entorno

  constructor(private http: HttpClient, private headerInject: HeaderInjector) {}

  getUsernameById(userId: string): Observable<string> {
    return this.getUserById(userId).pipe(
      map(users => users.username || 'Unknown') // Extrae el nombre del primer usuario, maneja si está vacío
    );
  }
  

  getUserById(userId: string): Observable<any> {
    const headers = this.headerInject.injectHeader();
    return this.http.get<any>(`${this.apiUrl}/${userId}`, { headers })
      .pipe(
        catchError(error => throwError(() => new Error('Error fetching user.')))
      );
  }
  
}