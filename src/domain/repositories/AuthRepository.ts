// src/domain/repositories/AuthRepository.ts
import { AuthCredentials, SignupCredentials } from '../entities/AuthCredentials';
import { AuthenticatedUser, UserData } from '../entities/User';

export interface AuthRepository {
  getCurrentUser(): AuthenticatedUser | null;

  onAuthStateChanged(callback: (user: AuthenticatedUser | null) => void): () => void; // Retorna função de unsubscribe

  onUserDataChanged(uid: string, callback: (userData: UserData | null) => void): () => void; // Retorna função de unsubscribe

  login(credentials: AuthCredentials): Promise<AuthenticatedUser>;

  signup(credentials: SignupCredentials): Promise<AuthenticatedUser>;

  logout(): Promise<void>;

  resetPassword(email: string): Promise<void>;

  createUserProfile(userData: UserData): Promise<void>;
}