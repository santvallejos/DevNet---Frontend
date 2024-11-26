export class User{
  id(id: any, updatedData: any) {
    throw new Error('Method not implemented.');
  }
  email: string = '';  
  token: string = '';  
  role: string | null = null; 
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

