// src/presentation/state/AuthContext.tsx
import { router } from 'expo-router';
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { AuthUseCases } from '@/application/use-cases/AuthUseCases';
import { AuthCredentials, SignupCredentials } from '@domain/entities/AuthCredentials';
import { AuthenticatedUser, UserData } from '@domain/entities/User';
import { AuthRepository } from '@domain/repositories/AuthRepository';
import { FirebaseAuthRepository } from '@infrastructure/repositories/FirebaseAuthRepository';

interface AuthContextData {
  user: AuthenticatedUser | null; 
  userData: UserData | null;     
  isAuthenticated: boolean;
  loading: boolean;
  signup: (credentials: SignupCredentials) => Promise<void>;
  login: (credentials: AuthCredentials) => Promise<void>;   
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

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

    unsubscribeAuth = authUseCases.observeAuth.execute((authUser) => {
      setUser(authUser);

      if (unsubscribeUserData) {
        unsubscribeUserData();
        unsubscribeUserData = null;
        setUserData(null); 
      }

      if (authUser) {
         unsubscribeUserData = authUseCases.observeUserData.execute(authUser.uid, (data) => {
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

  const handleLogin = useCallback(async (credentials: AuthCredentials) => {
      await authUseCases.login.execute(credentials);
      router.replace('/dashboard');
  }, []);

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
      signup: handleSignup,
      login: handleLogin,
      resetPassword: handleResetPassword,
      signOut: handleSignOut,
    }),
    [user, userData, loading, handleSignup, handleLogin, handleResetPassword, handleSignOut]
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