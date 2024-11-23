import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class PostService {
  private apiUrl = `${environment.base_url}/posts`;  // Usar base_url del entorno

  constructor(private http: HttpClient) {}

  // Obtener todos los posts
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
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
