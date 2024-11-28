import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { HeaderInjector } from './headerInjector.service';
import { Post } from '../core/models/publication';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private base_url = environment.base_url;

  constructor(private http: HttpClient, private headerInject: HeaderInjector,  private toastr: ToastrService, private router: Router,) {}

  // Obtener todos los posts
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base_url}/Posts`).pipe(
      catchError(error => throwError(() => new Error('Error fetching posts.')))
    );
  }

  // Obtener los posts del feed de un usuario
  getFeed(userId: string, page = 1, pageSize = 10): Observable<any[]> {
    const headers = this.headerInject.injectHeader();  // Inyecta las cabeceras si es necesario
    return this.http.get<any[]>(`${this.base_url}/Posts/feed/${userId}?page=${page}&pageSize=${pageSize}`, { headers })
      .pipe(catchError(error => throwError(() => new Error('Error fetching feed.'))));
  }

  // Obtener los posts de un usuario específico
  getUserPosts(userId: string): Observable<any[]> {
    const headers = this.headerInject.injectHeader();  // Inyecta las cabeceras si es necesario
    return this.http.get<any[]>(`${this.base_url}/Posts/user/${userId}?userId=${userId}`, { headers })
      .pipe(catchError(error => throwError(() => new Error('Error fetching user posts.'))));
  }


  // Crear un nuevo post
  createPost(post: Post) {
    
    // Obtener el userId del usuario logueado desde el sessionStorage o cualquier otro lugar donde lo guardes
    const userSession = JSON.parse(localStorage.getItem('userSession') || '{}');
    const userId = userSession?.id; // Asegúrate de que el campo 'id' exista en la respuesta del login
  
    // Verificar si el userId está disponible
    if (!userId) {
      this.toastr.error('Usuario no autenticado. No se puede crear el post.');
      return;
    }
  
    // Crear el objeto del post con userId, text y mediaUrl (si existe)
    const postData = {
      userId: userId,  // Agregar el userId
      text: post.text, // El contenido del post
      mediaUrl: post.mediaUrl || null  // Si hay mediaUrl, lo incluimos, sino es null
    };
  
    return this.http.post(`${this.base_url}/Posts`, postData).pipe(
      tap({
        next: (response: any) => {
          // Acción cuando el post se crea exitosamente
          this.toastr.success('Post creado con éxito!');
          // Redirigir a la página de los posts o cualquier otra acción
          this.router.navigate(['pages/home']);
        },
        error: (error: { error: { description: string; }[]; }) => {
          // Si el error tiene un array de mensajes, los mostramos
          if (error.error?.length >= 1) {
            error.error.forEach((errorMsg: { description: string }) => {
              this.toastr.error(errorMsg.description);
            });
          } else {
            // En caso de un error general
            this.toastr.error('Ocurrió un error al crear el post.');
          }
        }
      })
    );
  }
  

  // Obtener detalles de un post por ID
  getPostById(postId: string): Observable<any> {
    return this.http.get<any>(`${this.base_url}/Posts/${postId}`).pipe(
      catchError(error => throwError(() => new Error('Error fetching post by ID.')))
    );
  }
}
