export class User{
  email: string = '';  
  token: string = '';  
}

export interface LoginRequest {
    username: string,
    password: string,
}

export interface RegisterRequest {
    name: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    profileImageUrl: File | null;
   // dateOfBirth: Date; 
  }

 
export interface RecoverPasswordResponse {
    success: boolean;
    message: string;
  }

export interface  UserSessionInfo {
    username: string;
    role: string;
    name?: string;
  }

