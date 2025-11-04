import { router } from 'expo-router';
import type { ReactNode } from 'react';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { AuthUseCases } from '@/domain/use-cases/AuthUseCaseFactory';
import type { AuthContextData } from '@/shared/interfaces/auth.interfaces';
import type { AuthCredentials, SignupCredentials } from '@domain/entities/AuthCredentials';
import type { AuthenticatedUser, UserData } from '@domain/entities/User';
import type { AuthRepository } from '@domain/repositories/AuthRepository';
import { FirebaseAuthRepository } from '@infrastructure/repositories/FirebaseAuthRepository';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const firebaseAuthRepository: AuthRepository = new FirebaseAuthRepository();
const authUseCases = new AuthUseCases(firebaseAuthRepository);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeAuth: (() => void) | null = null;
    let unsubscribeUserData: (() => void) | null = null;

    unsubscribeAuth = authUseCases.observeAuth.execute((authUser): void => {
      setUser(authUser);

      if (unsubscribeUserData) {
        unsubscribeUserData();
        unsubscribeUserData = null;
        setUserData(null); 
      }

      if (authUser) {
         unsubscribeUserData = authUseCases.observeUserData.execute(authUser.uid, (data): void => {
             setUserData(data);
             setLoading(false);
         });
      } else {
         setUserData(null);
         setLoading(false); 
      }
    });

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribeUserData) unsubscribeUserData();
    };
  }, []);

  const handleSignup = useCallback(async (credentials: SignupCredentials) => {
      await authUseCases.signup.execute(credentials);
      router.replace('/dashboard'); 
  }, []);

  const handleSignupWrapper = useCallback(async (
    ...args: [SignupCredentials] | [string, string, string?]
  ) => {
    if (args.length === 1) return await handleSignup(args[0]);
    const [email, password, name] = args;
    await handleSignup({ email, password, name: name ?? '' });
  }, [handleSignup]);

  const handleLogin = useCallback(async (credentials: AuthCredentials) => {
      await authUseCases.login.execute(credentials);
      router.replace('/dashboard');
  }, []);

  const handleLoginWrapper = useCallback(async (
    ...args: [AuthCredentials] | [string, string]
  ) => {
    if (args.length === 1) return await handleLogin(args[0]);
    const [email, password] = args;
    await handleLogin({ email, password });
  }, [handleLogin]);

  const handleResetPassword = useCallback(async (email: string) => {
      await authUseCases.resetPassword.execute(email);
  }, []);

    const handleSignOut = useCallback(async () => {
    try {
      await authUseCases.logout.execute();
      router.replace('/');
    } catch (error) {
      console.error("Erro ao fazer logout no AuthContext:", error);
    }
  }, []);


  const contextValue = useMemo(
    () => ({
      user,
      userData,
      isAuthenticated: !!user,
      loading,
      signup: handleSignupWrapper,
      login: handleLoginWrapper,
      resetPassword: handleResetPassword,
      signOut: handleSignOut,
    }),
    [user, userData, loading, handleSignupWrapper, handleLoginWrapper, handleResetPassword, handleSignOut]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}