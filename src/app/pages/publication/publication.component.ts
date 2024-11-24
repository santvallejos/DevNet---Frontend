import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { NgFor, NgForOf, NgIf } from '@angular/common';

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

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.postService.getFeed(this.getUserId()).subscribe({
      next: (data) => {
        this.posts = data; // Verifica que data sea un array de posts válido
        this.isLoading = false;
        console.log(this.posts);
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
