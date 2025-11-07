import type { AuthCredentials, SignupCredentials } from '@domain/entities/AuthCredentials';
import type { AuthenticatedUser, UserData } from '@domain/entities/User';
import type { AuthRepository } from '@domain/repositories/AuthRepository';
import { BaseUseCase } from './BaseUseCase';


export class LoginUseCase extends BaseUseCase {
  constructor(private authRepository: AuthRepository) {
    super(); 
  }

  async execute(credentials: AuthCredentials): Promise<AuthenticatedUser> {
    return this._tryExecute(async () => {
       return await this.authRepository.login(credentials);
    });
  }
}

export class SignupUseCase extends BaseUseCase {
  constructor(private authRepository: AuthRepository) {
    super();
  }

  async execute(credentials: SignupCredentials): Promise<AuthenticatedUser> {
    return this._tryExecute(async () => {
      return await this.authRepository.signup(credentials);
    });
  }
}

export class LogoutUseCase extends BaseUseCase {
    constructor(private authRepository: AuthRepository) {
        super();
    }

    async execute(): Promise<void> {
        return this._tryExecute(async () => {
            await this.authRepository.logout();
        });
    }
}

 export class ResetPasswordUseCase extends BaseUseCase {
    constructor(private authRepository: AuthRepository) {
        super();
    }

    async execute(email: string): Promise<void> {
        return this._tryExecute(async () => {
            await this.authRepository.resetPassword(email);
        });
    }
}


export class ObserveAuthStateUseCase {
    constructor(private authRepository: AuthRepository) {}

    execute(presentationCallback: (user: AuthenticatedUser | null) => void): () => void {
       
       const repositoryCallback = (userFromRepo: AuthenticatedUser | null): void => {
            presentationCallback(userFromRepo);
       };
       
       return this.authRepository.onAuthStateChanged(repositoryCallback);
    }
}

export class ObserveUserDataUseCase {
    constructor(private authRepository: AuthRepository) {}

    execute(uid: string, presentationCallback: (userData: UserData | null) => void): () => void {
       return this.authRepository.onUserDataChanged(uid, (userDataFromRepo) => {
            presentationCallback(userDataFromRepo);
       });
    }
}


export class AuthUseCasesFactory {
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