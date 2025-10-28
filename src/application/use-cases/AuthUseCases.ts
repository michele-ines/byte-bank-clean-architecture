// src/application/usecases/AuthUseCases.ts
import { AuthCredentials, SignupCredentials } from '@domain/entities/AuthCredentials';
import { AuthenticatedUser, UserData } from '@domain/entities/User';
import { AuthRepository } from '@domain/repositories/AuthRepository';

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(credentials: AuthCredentials): Promise<AuthenticatedUser> {
    try {
       return await this.authRepository.login(credentials);
    } catch (error) {
        console.error("Erro no LoginUseCase:", error);
        throw error;
    }
  }
}

export class SignupUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(credentials: SignupCredentials): Promise<AuthenticatedUser> {
    try {
      return await this.authRepository.signup(credentials);
    } catch (error) {
        console.error("Erro no SignupUseCase:", error);
        throw error;
    }
  }
}

export class LogoutUseCase {
    constructor(private authRepository: AuthRepository) {}

    async execute(): Promise<void> {
        try {
            await this.authRepository.logout();
        } catch(error) {
            console.error("Erro no LogoutUseCase:", error);
            throw error;
        }
    }
}

 export class ResetPasswordUseCase {
    constructor(private authRepository: AuthRepository) {}

    async execute(email: string): Promise<void> {
        try {
            await this.authRepository.resetPassword(email);
        } catch(error) {
            console.error("Erro no ResetPasswordUseCase:", error);
            throw error;
        }
    }
}

export class ObserveAuthStateUseCase {
    constructor(private authRepository: AuthRepository) {}

    execute(callback: (user: AuthenticatedUser | null) => void): () => void {
       return this.authRepository.onAuthStateChanged(callback);
    }
}

export class ObserveUserDataUseCase {
    constructor(private authRepository: AuthRepository) {}

    execute(uid: string, callback: (userData: UserData | null) => void): () => void {
       return this.authRepository.onUserDataChanged(uid, callback);
    }
}

export class AuthUseCases {
  login: LoginUseCase;
  signup: SignupUseCase;
  logout: LogoutUseCase;
  resetPassword: ResetPasswordUseCase;
  observeAuth: ObserveAuthStateUseCase;
  observeUserData: ObserveUserDataUseCase;

  constructor(authRepository: AuthRepository) {
    this.login = new LoginUseCase(authRepository);
    this.signup = new SignupUseCase(authRepository);
    this.logout = new LogoutUseCase(authRepository);
    this.resetPassword = new ResetPasswordUseCase(authRepository);
    this.observeAuth = new ObserveAuthStateUseCase(authRepository);
    this.observeUserData = new ObserveUserDataUseCase(authRepository);
  }
}