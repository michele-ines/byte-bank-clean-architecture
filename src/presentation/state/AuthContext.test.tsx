/* eslint-disable import/first */
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';
import React, { type JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
}));

jest.mock('@infrastructure/config/firebaseConfig', () => ({
  auth: {},
  db: {},
}));

jest.mock(
  '@infrastructure/repositories/FirebaseAuthRepository',
  () => ({
    FirebaseAuthRepository: jest.fn(),
  })
);

jest.mock('../config/loggerService', () => ({
  loggerService: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../hooks/useInactivityLogout', () => ({
  useInactivityLogout: jest.fn(),
}));

jest.mock('./LoggerContext', () => ({
  useLogger: () => ({
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  }),
}));

const mockSignupExecute = jest.fn<Promise<void>, [unknown]>();
const mockLoginExecute = jest.fn<Promise<void>, [unknown]>();
const mockLogoutExecute = jest.fn<Promise<void>, []>();
const mockResetPasswordExecute = jest.fn<Promise<void>, [string]>();

jest.mock('@/application/use-cases/AuthUseCaseFactory', () => ({
  AuthUseCasesFactory: jest.fn().mockImplementation(() => ({
    signup: { execute: mockSignupExecute },
    login: { execute: mockLoginExecute },
    logout: { execute: mockLogoutExecute },
    resetPassword: { execute: mockResetPasswordExecute },
    observeAuth: {
      execute: jest.fn((callback: (user: null) => void) => {
        callback(null);
        return jest.fn();
      }),
    },
    observeUserData: {
      execute: jest.fn((_uid: string, callback: (data: null) => void) => {
        callback(null);
        return jest.fn();
      }),
    },
  })),
}));

import { AuthProvider, useAuth } from './AuthContext';

const TestComponent: React.FC = (): JSX.Element => {
  const auth = useAuth();
  const [error, setError] = React.useState<string | null>(null);

  const handleAsync = async (fn: () => Promise<void>): Promise<void> => {
    try {
      await fn();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <View>
      {error && <Text testID="error">{error}</Text>}

      <TouchableOpacity
        testID="signup"
        onPress={() => {
          void handleAsync(() =>
            auth.signup('test@example.com', 'password123', 'Test User')
          );
        }}
      >
        <Text>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity
        testID="login"
        onPress={() => {
          void handleAsync(() =>
            auth.login('test@example.com', 'password123')
          );
        }}
      >
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        testID="resetPassword"
        onPress={() => {
          void handleAsync(() =>
            auth.resetPassword('test@example.com')
          );
        }}
      >
        <Text>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        testID="signOut"
        onPress={() => {
          void handleAsync(() => auth.signOut());
        }}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderWithProvider = (): ReturnType<typeof render> =>
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

describe('AuthContext', () => {
  beforeEach((): void => {
    jest.clearAllMocks();
  });

  it('deve criar conta com sucesso e navegar para /dashboard', async (): Promise<void> => {
    mockSignupExecute.mockResolvedValueOnce(undefined);

    const { getByTestId } = renderWithProvider();
    fireEvent.press(getByTestId('signup'));

    await waitFor(() => {
      expect(mockSignupExecute).toHaveBeenCalled();
      expect(router.replace).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('deve mostrar erro quando signup falha', async (): Promise<void> => {
    mockSignupExecute.mockRejectedValueOnce(
      new Error('Email already in use')
    );

    const { getByTestId } = renderWithProvider();
    fireEvent.press(getByTestId('signup'));

    await waitFor(() => {
      expect(getByTestId('error').children[0]).toBe(
        'Email already in use'
      );
    });
  });

  it('deve fazer login com sucesso e navegar para /dashboard', async (): Promise<void> => {
    mockLoginExecute.mockResolvedValueOnce(undefined);

    const { getByTestId } = renderWithProvider();
    fireEvent.press(getByTestId('login'));

    await waitFor(() => {
      expect(mockLoginExecute).toHaveBeenCalled();
      expect(router.replace).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('deve mostrar erro quando login falha', async (): Promise<void> => {
    mockLoginExecute.mockRejectedValueOnce(
      new Error('Invalid credentials')
    );

    const { getByTestId } = renderWithProvider();
    fireEvent.press(getByTestId('login'));

    await waitFor(() => {
      expect(getByTestId('error').children[0]).toBe(
        'Invalid credentials'
      );
    });
  });

  it('deve enviar email de reset com sucesso', async (): Promise<void> => {
    mockResetPasswordExecute.mockResolvedValueOnce(undefined);

    const { getByTestId } = renderWithProvider();
    fireEvent.press(getByTestId('resetPassword'));

    await waitFor(() => {
      expect(mockResetPasswordExecute).toHaveBeenCalledWith(
        'test@example.com'
      );
    });
  });

  it('deve mostrar erro quando reset falha', async (): Promise<void> => {
    mockResetPasswordExecute.mockRejectedValueOnce(
      new Error('User not found')
    );

    const { getByTestId } = renderWithProvider();
    fireEvent.press(getByTestId('resetPassword'));

    await waitFor(() => {
      expect(getByTestId('error').children[0]).toBe('User not found');
    });
  });

  it('deve fazer logout com sucesso e navegar para /', async (): Promise<void> => {
    mockLogoutExecute.mockResolvedValueOnce(undefined);

    const { getByTestId } = renderWithProvider();
    fireEvent.press(getByTestId('signOut'));

    await waitFor(() => {
      expect(mockLogoutExecute).toHaveBeenCalled();
      expect(router.replace).toHaveBeenCalledWith('/');
    });
  });

  it('não deve quebrar a aplicação quando logout falha', async (): Promise<void> => {
    mockLogoutExecute.mockRejectedValueOnce(
      new Error('Logout failed')
    );

    const { getByTestId } = renderWithProvider();
    fireEvent.press(getByTestId('signOut'));

    await waitFor(() => {
      expect(mockLogoutExecute).toHaveBeenCalled();
    });
  });
});