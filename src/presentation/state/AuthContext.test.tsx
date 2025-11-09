import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { onSnapshot, setDoc } from 'firebase/firestore';
import type { JSX } from 'react';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AuthProvider, useAuth } from './AuthContext';

beforeAll((): void => {
  jest.spyOn(console, 'error').mockImplementation(jest.fn());
});

afterAll((): void => {
  (console.error as jest.Mock).mockRestore();
});

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
  doc: jest.fn(() => 'mock-doc-ref'),
  setDoc: jest.fn(),
  onSnapshot: jest.fn(),
  serverTimestamp: jest.fn(() => ({ seconds: 1234567890, nanoseconds: 0 })),
}));

jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
}));

jest.mock('@infrastructure/config/firebaseConfig', () => ({
  auth: {},
  db: {},
}));

jest.mock('./LoggerContext', () => ({
  useLogger: () => ({
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  }),
  loggerService: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

const TestComponent: React.FC = (): JSX.Element => {
  const {
    user,
    userData,
    isAuthenticated,
    loading,
    signup,
    login,
    resetPassword,
    signOut: handleSignOut,
  } = useAuth();

  const [error, setError] = React.useState<string | null>(null);

  const handleSignup = (): void => {
    void (async (): Promise<void> => {
      try {
        await signup('test@example.com', 'password123', 'Test User');
      } catch (err) {
        setError((err as Error).message);
      }
    })();
  };

  const handleLogin = (): void => {
    void (async (): Promise<void> => {
      try {
        await login('test@example.com', 'password123');
      } catch (err) {
        setError((err as Error).message);
      }
    })();
  };

  const handleResetPassword = (): void => {
    void (async (): Promise<void> => {
      try {
        await resetPassword('test@example.com');
      } catch (err) {
        setError((err as Error).message);
      }
    })();
  };

  const handleSignOutClick = (): void => {
    void (async (): Promise<void> => {
      try {
        await handleSignOut();
      } catch (err) {
        setError((err as Error).message);
      }
    })();
  };

  return (
    <View>
      <Text testID="isAuthenticated">{isAuthenticated.toString()}</Text>
      <Text testID="loading">{loading.toString()}</Text>
      <Text testID="userExists">{user ? 'true' : 'false'}</Text>
      <Text testID="userDataExists">{userData ? 'true' : 'false'}</Text>
      {error && <Text testID="error">{error}</Text>}

      <TouchableOpacity testID="signup" onPress={handleSignup}>
        <Text>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity testID="login" onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity testID="resetPassword" onPress={handleResetPassword}>
        <Text>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity testID="signOut" onPress={handleSignOutClick}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderWithProvider = (
  component: React.ReactElement
): ReturnType<typeof render> => {
  return render(<AuthProvider>{component}</AuthProvider>);
};

describe('AuthContext', (): void => {
  beforeEach((): void => {
    jest.clearAllMocks();

    (onAuthStateChanged as jest.Mock).mockImplementation(
      (_auth: unknown, callback: (user: unknown) => void): (() => void) => {
        callback(null);
        return jest.fn();
      }
    );

    (onSnapshot as jest.Mock).mockImplementation(
      (
        _docRef: unknown,
        callback: (snap: { exists: () => boolean }) => void
      ): (() => void) => {
        callback({ exists: () => false });
        return jest.fn();
      }
    );
  });

  describe('signup method', (): void => {
    it('deve criar conta com sucesso', async (): Promise<void> => {
      const mockUser = { uid: 'test-user-id' };
      const mockUserCredential = { user: mockUser };
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce(
        mockUserCredential
      );
      (setDoc as jest.Mock).mockResolvedValueOnce(undefined);

      const { getByTestId } = renderWithProvider(<TestComponent />);
      fireEvent.press(getByTestId('signup'));

      return waitFor((): void => {
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
          expect.anything(),
          'test@example.com',
          'password123'
        );
        expect(setDoc).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({
            uuid: 'test-user-id',
            name: 'Test User',
            email: 'test@example.com',
          }),
          { merge: true }
        );
      });
    });

    it('deve mostrar erro quando signup falha', async (): Promise<void> => {
      const error = new Error('Email already in use');
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
        error
      );

      const { getByTestId } = renderWithProvider(<TestComponent />);
      fireEvent.press(getByTestId('signup'));

      return waitFor((): void => {
        expect(getByTestId('error').children[0]).toBe('Email already in use');
      });
    });
  });

  describe('login method', (): void => {
    it('deve fazer login com sucesso', async (): Promise<void> => {
      const mockUserCredential = { user: { uid: 'test-user-id' } };
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce(
        mockUserCredential
      );

      const { getByTestId } = renderWithProvider(<TestComponent />);
      fireEvent.press(getByTestId('login'));

      return waitFor((): void => {
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
          expect.anything(),
          'test@example.com',
          'password123'
        );
      });
    });

    it('deve mostrar erro quando login falha', async (): Promise<void> => {
      const error = new Error('Invalid credentials');
      (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(error);

      const { getByTestId } = renderWithProvider(<TestComponent />);
      fireEvent.press(getByTestId('login'));

      return waitFor((): void => {
        expect(getByTestId('error').children[0]).toBe('Invalid credentials');
      });
    });
  });

  describe('resetPassword method', (): void => {
    it('deve enviar email de reset com sucesso', async (): Promise<void> => {
      (sendPasswordResetEmail as jest.Mock).mockResolvedValueOnce(undefined);

      const { getByTestId } = renderWithProvider(<TestComponent />);
      fireEvent.press(getByTestId('resetPassword'));

      return waitFor((): void => {
        expect(sendPasswordResetEmail).toHaveBeenCalledWith(
          expect.anything(),
          'test@example.com'
        );
      });
    });

    it('deve mostrar erro quando reset falha', async (): Promise<void> => {
      const error = new Error('User not found');
      (sendPasswordResetEmail as jest.Mock).mockRejectedValueOnce(error);

      const { getByTestId } = renderWithProvider(<TestComponent />);
      fireEvent.press(getByTestId('resetPassword'));

      return waitFor((): void => {
        expect(getByTestId('error').children[0]).toBe('User not found');
      });
    });
  });

  describe('handleSignOut method', (): void => {
    it('deve fazer logout com sucesso e navegar', async (): Promise<void> => {
      (signOut as jest.Mock).mockResolvedValueOnce(undefined);

      const { getByTestId } = renderWithProvider(<TestComponent />);
      fireEvent.press(getByTestId('signOut'));

      return waitFor((): void => {
        expect(signOut).toHaveBeenCalled();
        expect(router.replace).toHaveBeenCalledWith('/');
      });
    });

    it('deve capturar erro quando logout falha', async (): Promise<void> => {
      const error = new Error('Logout failed');
      (signOut as jest.Mock).mockRejectedValueOnce(error);

      const { getByTestId } = renderWithProvider(<TestComponent />);
      fireEvent.press(getByTestId('signOut'));

      return waitFor((): void => {
        expect(signOut).toHaveBeenCalled();
      });
    });
  });
});