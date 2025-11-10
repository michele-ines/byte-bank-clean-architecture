/* eslint-disable @typescript-eslint/unbound-method */
import type { AuthCredentials, SignupCredentials } from '@domain/entities/AuthCredentials';
import type { AuthenticatedUser, UserData } from '@domain/entities/User';
import type { AuthRepository } from '@domain/repositories/AuthRepository';
import {
  LoginUseCase,
  LogoutUseCase,
  ObserveAuthStateUseCase,
  ObserveUserDataUseCase,
  ResetPasswordUseCase,
  SignupUseCase,
} from './AuthUseCaseFactory';

const mockAuthRepository: jest.Mocked<AuthRepository> = {
  login: jest.fn(),
  signup: jest.fn(),
  logout: jest.fn(),
  resetPassword: jest.fn(),
  onAuthStateChanged: jest.fn(),
  onUserDataChanged: jest.fn(),
  getCurrentUser: jest.fn(),
  createUserProfile: jest.fn(),
};

const mockAuthenticatedUser: AuthenticatedUser = {
  uid: 'user-123',
  email: 'teste@teste.com',
  displayName: 'Usuário Teste',
};

const mockUserData: UserData = {
  uuid: 'user-123',
  name: 'Usuário Teste',
  email: 'teste@teste.com',
  photoURL: null,
  createdAt: new Date(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('LoginUseCase', () => {
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalConsoleError;
  });

  it('should call repository.login and return the authenticated user', async () => {
    const useCase = new LoginUseCase(mockAuthRepository);
    const mockCredentials: AuthCredentials = { email: 'teste@teste.com', password: '123' };

    mockAuthRepository.login.mockResolvedValue(mockAuthenticatedUser);

    const result = await useCase.execute(mockCredentials);

    expect(result).toBe(mockAuthenticatedUser);
    expect(mockAuthRepository.login).toHaveBeenCalledTimes(1);
    expect(mockAuthRepository.login).toHaveBeenCalledWith(mockCredentials);
  });

  it('should throw an error if the repository throws (validating BaseUseCase)', async () => {
    const useCase = new LoginUseCase(mockAuthRepository);
    const mockError = new Error('Invalid credentials');
    const mockCredentials: AuthCredentials = { email: 'teste@teste.com', password: '123' };

    mockAuthRepository.login.mockRejectedValue(mockError);

    await expect(useCase.execute(mockCredentials)).rejects.toThrow(mockError);
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('Erro no LoginUseCase:'),
      mockError,
    );
  });
});

describe('SignupUseCase', () => {
  it('should call repository.signup and return the new user', async () => {
    const useCase = new SignupUseCase(mockAuthRepository);
    const mockSignupData: SignupCredentials = {
      email: 'new@teste.com',
      password: '123',
      name: 'Novo User',
    };

    mockAuthRepository.signup.mockResolvedValue(mockAuthenticatedUser);

    const result = await useCase.execute(mockSignupData);

    expect(result).toBe(mockAuthenticatedUser);
    expect(mockAuthRepository.signup).toHaveBeenCalledTimes(1);
    expect(mockAuthRepository.signup).toHaveBeenCalledWith(mockSignupData);
  });
});

describe('LogoutUseCase', () => {
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalConsoleError;
  });

  it('should call repository.logout', async () => {
    const useCase = new LogoutUseCase(mockAuthRepository);
    mockAuthRepository.logout.mockResolvedValue(undefined);

    await useCase.execute();

    expect(mockAuthRepository.logout).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if repository.logout throws', async () => {
    const useCase = new LogoutUseCase(mockAuthRepository);
    const mockError = new Error('Logout failed');
    mockAuthRepository.logout.mockRejectedValue(mockError);

    await expect(useCase.execute()).rejects.toThrow(mockError);
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('Erro no LogoutUseCase:'),
      mockError,
    );
  });
});

describe('ResetPasswordUseCase', () => {
  it('should call repository.resetPassword with the correct email', async () => {
    const useCase = new ResetPasswordUseCase(mockAuthRepository);
    const mockEmail = 'forgot@teste.com';
    mockAuthRepository.resetPassword.mockResolvedValue(undefined);

    await useCase.execute(mockEmail);

    expect(mockAuthRepository.resetPassword).toHaveBeenCalledTimes(1);
    expect(mockAuthRepository.resetPassword).toHaveBeenCalledWith(mockEmail);
  });
});

describe('ObserveAuthStateUseCase', () => {
  it('should wrap the repository callback and forward data to presentation', () => {
    const useCase = new ObserveAuthStateUseCase(mockAuthRepository);
    const mockPresentationCallback = jest.fn();
    const mockUnsubscribe = jest.fn();

    mockAuthRepository.onAuthStateChanged.mockImplementation((repositoryCallback) => {
      repositoryCallback(mockAuthenticatedUser);
      return mockUnsubscribe;
    });

    const unsubscribeFn = useCase.execute(mockPresentationCallback);

    expect(mockAuthRepository.onAuthStateChanged).toHaveBeenCalledTimes(1);
    expect(mockPresentationCallback).toHaveBeenCalledTimes(1);
    expect(mockPresentationCallback).toHaveBeenCalledWith(mockAuthenticatedUser);
    expect(unsubscribeFn).toBe(mockUnsubscribe);

    unsubscribeFn();
    expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
  });
});

describe('ObserveUserDataUseCase', () => {
  it('should wrap onUserDataChanged and forward data', () => {
    const useCase = new ObserveUserDataUseCase(mockAuthRepository);
    const mockUid = 'user-123';
    const mockPresentationCallback = jest.fn();
    const mockUnsubscribe = jest.fn();

    mockAuthRepository.onUserDataChanged.mockImplementation((uid, repositoryCallback) => {
      repositoryCallback(mockUserData);
      return mockUnsubscribe;
    });

    const unsubscribeFn = useCase.execute(mockUid, mockPresentationCallback);

    expect(mockAuthRepository.onUserDataChanged).toHaveBeenCalledTimes(1);
    expect(mockAuthRepository.onUserDataChanged).toHaveBeenCalledWith(
      mockUid,
      expect.any(Function),
    );
    expect(mockPresentationCallback).toHaveBeenCalledTimes(1);
    expect(mockPresentationCallback).toHaveBeenCalledWith(mockUserData);
    expect(unsubscribeFn).toBe(mockUnsubscribe);
  });
});
