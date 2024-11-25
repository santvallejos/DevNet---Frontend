import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css'],
  standalone: true,
})
export class PublicationComponent implements OnInit {
  posts: any[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data; // Verifica que data sea un array de posts válido
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
      },
    });
  }
}
