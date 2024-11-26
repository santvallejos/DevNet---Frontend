import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css'],
  standalone: true,
  imports: [NgIf,NgFor,NgForOf]
})
export class PublicationComponent implements OnInit {
  posts: any[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private postService: PostService, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.isLoading = true;
  
    this.postService.getFeed(this.getUserId()).subscribe({
      next: (dataArray) => {
        // Mapeamos las solicitudes para obtener los nombres de usuario
        const postsWithUsernames$ = dataArray.map(data => {
          return this.userService.getUsernameById(data.userId).pipe(
            map(username => {
              const createdDate = new Date(data.createdAt); // Convierte la fecha en un objeto Date
              return {
                text: data.text,
                username: username,
                createdAt: createdDate.toLocaleDateString('en-US'), // Formato estándar MM/DD/YYYY
                profileImageUrl: data.profileImageUrl || 'assets/blank-profile.png',
                mediaUrl: data.mediaUrl,
                likes: data.likes || 0,
                commentaries: data.commentaries || 0
              };
            })
          );
        });
  
        // Usamos forkJoin para esperar a todas las solicitudes
        forkJoin(postsWithUsernames$).subscribe({
          next: (posts) => {
            this.posts = posts; // Una vez completadas, asignamos los posts
            this.isLoading = false;
            console.log(this.posts);
          },
          error: (err) => {
            this.error = err.message;
            this.isLoading = false;
            console.error(err);
          }
        });
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
        console.error(err);
      },
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
