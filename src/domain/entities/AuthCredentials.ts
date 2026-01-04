import type { FirebaseTransactionRepository } from "@/infrastructure/repositories/FirebaseTransactionRepository";
import type { AuthenticatedUser } from "./User";

export interface AuthCredentials {
  email: string;
  password?: string; 
}

export interface SignupCredentials extends AuthCredentials {
  name: string;
  password: string; 
}

export interface UseInactivityLogoutProps {
  user: AuthenticatedUser | null;
  onSignOut: () => Promise<void>;
}

export interface UseSecureTokenReturn {
  saveToken: (token: string) => Promise<void>;
  getToken: () => Promise<string | null>;
  removeToken: () => Promise<void>;
  hasToken: () => Promise<boolean>;
}

export interface UseTransactionsQueryProps {
  userId: string;
  repository: FirebaseTransactionRepository;
  enabled?: boolean;
}
