import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ExecOptions } from 'node:child_process';
import { Console } from 'node:console';
import { HeaderInjector } from './headerInjector.service';


@Injectable({
  providedIn: 'root'
})

export class PostService {
  private apiUrl = `${environment.base_url}/Posts`;  // Usar base_url del entorno

  constructor(private http: HttpClient, private headerInject: HeaderInjector) {}

  // Obtener todos los posts
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener los posts del feed de un usuario
  getFeed(userId: string, page = 1, pageSize = 10): Observable<any[]> {
    const headers = this.headerInject.injectHeader();
    return this.http.get<any[]>(`${this.apiUrl}/feed/${userId}?page=${page}&pageSize=${pageSize}`, {headers})
      .pipe(catchError(error => throwError(() => new Error('Error fetching feed.'))));
  }
  
  getUserPosts(userId : string) : Observable<any[]>{
    const headers = this.headerInject.injectHeader();
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}?userId=${userId}`, {headers})
      .pipe(catchError(error => throwError(() => new Error('Error fetching user posts.'))));
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
