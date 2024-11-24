import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ExecOptions } from 'node:child_process';
import { Console } from 'node:console';


@Injectable({
  providedIn: 'root'
})

export class PostService {
  private apiUrl = `${environment.base_url}/Posts`;  // Usar base_url del entorno

  constructor(private http: HttpClient) {}

  // Obtener todos los posts
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener los posts del feed de un usuario
  getFeed(userId: string, page = 1, pageSize = 10): Observable<any[]> {
    const sessionData = localStorage.getItem('userSession');
    console.log("sessionData:", sessionData);  // Log para verificar que se obtiene correctamente la sesión.
    
    if (!sessionData) return throwError(() => new Error('No user session found.'));
  
    // Parseamos los datos del JSON a objeto, sin convertirlo a cadena.
    const parsedData = JSON.parse(sessionData);
    console.log("parsed sessionData:", parsedData);  // Log para verificar la estructura del objeto.
  
    // Accedemos al token dentro del objeto parsedData. Asegúrate de acceder a la propiedad correcta.
    const token = parsedData?.data?.token;
    console.log("token:", token);  // Log para verificar el token que estamos obteniendo.
  
    if (!token) return throwError(() => new Error('Bearer token is missing.'));
  
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('accept', 'application/json');
    
    return this.http.get<any[]>(`${this.apiUrl}/feed/${userId}?page=${page}&pageSize=${pageSize}`, { headers })
      .pipe(catchError(error => throwError(() => new Error('Error fetching feed.'))));
  }
  
  // Crear un nuevo post
  createPost(post: { text: string, mediaUrl?: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, post);
  }

  // Obtener detalles de un post por id
  getPostById(postId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${postId}`);
  }
}
