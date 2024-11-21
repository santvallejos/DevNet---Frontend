export class User{
  email: string = '';  
  token: string = '';  
}

export interface LoginRequest {
    username: string,
    password: string,
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    profilePicture: File | null;
   // dateOfBirth: Date; 
  }

 
export interface RecoverPasswordResponse {
    success: boolean;
    message: string;
  }

