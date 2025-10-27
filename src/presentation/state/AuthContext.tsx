import { auth, db } from "@infrastructure/config/firebaseConfig";
import type { AuthContextData, UserData } from "@shared/interfaces/auth.interfaces";
import { router } from "expo-router";
import type { User, UserCredential } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import type { ReactNode } from "react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AUTH_ROUTES = {
  login: "/",
  dashboard: "/dashboard",
} as const;

const AUTH_MESSAGES = {
  logoutError: "Erro ao fazer logout",
} as const;

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect((): (() => void) => {
    let unsubscribeUser: () => void = (): void => {
      // função inicial vazia para evitar erro antes da definição real
    };

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser: User | null): void => {
      setUser(currentUser);
      unsubscribeUser();

      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        unsubscribeUser = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data() as UserData);
          } else {
            setUserData(null);
          }
        });
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return (): void => {
      unsubscribeAuth();
      unsubscribeUser();
    };
  }, []);

  // 🔹 Cria usuário e retorna o UserCredential
  const signup = useCallback(
    async (email: string, password: string, name: string): Promise<UserCredential> => {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      await setDoc(doc(db, "users", newUser.uid), {
        uuid: newUser.uid,
        name,
        email,
        createdAt: serverTimestamp(),
      });

      return userCredential;
    },
    []
  );

  // 🔹 Login do usuário
  const login = useCallback(
    (email: string, password: string): Promise<UserCredential> =>
      signInWithEmailAndPassword(auth, email, password),
    []
  );

  // 🔹 Reset de senha
  const resetPassword = useCallback(
    (email: string): Promise<void> => sendPasswordResetEmail(auth, email),
    []
  );

  // 🔹 Logout do usuário
  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      router.replace(AUTH_ROUTES.login);
    } catch (error) {
      console.error(`${AUTH_MESSAGES.logoutError}:`, error);
    }
  };

  // 🔹 Contexto com função síncrona que chama o async internamente
  const contextValue = useMemo<AuthContextData>(
    () => ({
      user,
      userData,
      isAuthenticated: !!user,
      loading,
      signup,
      login,
      resetPassword,
      // ✅ Corrigido: evita o erro no-misused-promises
      signOut: (): void => {
        void handleSignOut();
      },
    }),
    [user, userData, loading, signup, login, resetPassword]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
