export interface AuthCredentials {
  email: string;
  password?: string; 
}

export interface SignupCredentials extends AuthCredentials {
  name: string;
  password: string; 
}