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

import type { AuthContextData } from '@/shared/interfaces/auth.interfaces';
import type { AuthCredentials, SignupCredentials } from '@domain/entities/AuthCredentials';
import type { AuthenticatedUser, UserData } from '@domain/entities/User';
import type { AuthRepository } from '@domain/repositories/AuthRepository';
import { AuthUseCasesFactory } from '@domain/use-cases/AuthUseCaseFactory';
import { auth, db } from '@infrastructure/config/firebaseConfig';
import { FirebaseAuthRepository } from '@infrastructure/repositories/FirebaseAuthRepository';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// REMOVIDO: A inicialização foi movida para DENTRO do Provider
// const firebaseAuthRepository: AuthRepository = new FirebaseAuthRepository(auth, db);
// const authUseCases = new AuthUseCasesFactory(firebaseAuthRepository);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  // CORREÇÃO: Inicializa os serviços com useMemo.
  // Isso garante que 'auth' e 'db' estejam definidos (pois os módulos já carregaram)
  // antes de serem passados para o construtor.
  const authUseCases = useMemo(() => {
    const firebaseAuthRepository: AuthRepository = new FirebaseAuthRepository(auth, db);
    return new AuthUseCasesFactory(firebaseAuthRepository);
  }, []); // O array vazio [] garante que isso só rode uma vez.

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
  }, [authUseCases]); // Adiciona authUseCases à dependência do useEffect

  const handleSignup = useCallback(async (credentials: SignupCredentials) => {
      await authUseCases.signup.execute(credentials);
      router.replace('/dashboard'); 
  }, [authUseCases]);

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
  }, [authUseCases]);

  const handleLoginWrapper = useCallback(async (
    ...args: [AuthCredentials] | [string, string]
  ) => {
    if (args.length === 1) return await handleLogin(args[0]);
    const [email, password] = args;
    await handleLogin({ email, password });
  }, [handleLogin]);

  const handleResetPassword = useCallback(async (email: string) => {
      await authUseCases.resetPassword.execute(email);
  }, [authUseCases]);

    const handleSignOut = useCallback(async () => {
    try {
      await authUseCases.logout.execute();
      router.replace('/');
    } catch (error) {
      console.error("Erro ao fazer logout no AuthContext:", error);
    }
  }, [authUseCases]);


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