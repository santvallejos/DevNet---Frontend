export interface LoginRequest {
    get(arg0: string): any;
    email: string,
    password: string,
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePicture: File | null;
    dateOfBirth: Date; 
  }
  
 
export interface RecoverPasswordResponse {
    success: boolean;
    message: string;
  }