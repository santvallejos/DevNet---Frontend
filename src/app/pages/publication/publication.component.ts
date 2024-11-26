import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { forkJoin, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css'],
  standalone: true,
  imports: [NgIf,NgFor,NgForOf]
})
export class PublicationComponent implements OnInit {
  @Input() userId : string | null = null;
  posts: any[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private postService: PostService, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.isLoading = true;

    // Determinamos qué observable usar según el userId
    const postsObservable$ = this.userId === "feed" ||this.userId === null
      ? this.postService.getFeed(this.getUserId()) // Llama a getFeed si el userId es null
      : this.postService.getUserPosts(this.userId || ""); // Llama a getUserPosts si no es null
    
    postsObservable$.subscribe({
      next: (dataArray) => {
        // Mapeamos los datos recibidos para incluir los campos que necesitamos
        const postsWithUsernames$ = dataArray.map(data =>
          this.userService.getUsernameById(data.userId).pipe(
            map(username => {
              const createdDate = new Date(data.createdAt); // Convierte la fecha en un objeto Date
              return {
                text: data.text,
                username: username,
                createdAt: createdDate.toLocaleDateString('en-US'), // Formato estándar MM/DD/YYYY
                profileImageUrl: data.profileImageUrl || 'assets/blank-profile.png',
                mediaUrl: data.mediaUrl,
                likes: Array.isArray(data.likes) ? data.likes.length() : 0,
                commentaries: Array.isArray(data.commentaries) ? data.commentaries.length() : 0
              };
            })
          )
        );

        // Usamos forkJoin para esperar todas las respuestas
        forkJoin(postsWithUsernames$).subscribe({
          next: (posts) => { // Ahora `posts` se infiere como `any[]`
            this.posts = posts; // Asignamos los posts transformados a la propiedad posts
            this.isLoading = false;
            console.log(this.posts);  // Verifica los datos en la consola
          },
          error: (err: HttpErrorResponse) => {
            this.error = err.message;
            this.isLoading = false;
            console.error('Error fetching posts:', err);
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.message;
        this.isLoading = false;
        console.error('Error fetching posts:', err);
      }
    });
  }

  getUserId(): string {
    const sessionData = localStorage.getItem('userSession');
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      return parsedData.data.userId.toString();
    }

    return "";
  }
}
