export interface Publication {
    id: number;
    username: string;
    avatarUrl: string;
    content: string;
    imageUrl: string;
    likes: number;
    comments: number;
    isLiked: boolean;
  }

  export interface Post {
    userId: string;
    text: string;
    mediaUrl?: string | null;
    createdAt?: string;
    updatedAt?: string;
  }
  
  