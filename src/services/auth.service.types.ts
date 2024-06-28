export interface UserData {
    username: string;
    password: string;
    email?: string;
  }
  
  export interface AuthResponse {
    status: number;
    accessToken: string;
    refreshToken: string;
    user: UserData;
    type: string; // assuming type is a part of the response to determine the user role
    // add other response properties as needed
  }
  
  export interface RegisterData {
    username: string;
    email: string;
    password: string;
    // add other registration data properties as needed
  }
  
  export interface LoginFormData {
    username: string;
    password: string;
  }
  