
import { auth, db } from "@infrastructure/config/firebaseConfig";
import { AuthContextData, UserData } from "@shared/interfaces/auth.interfaces";
import { router } from "expo-router";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import React, {
  ReactNode,
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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeUser = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
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

  
    return () => {
      unsubscribeAuth();
      unsubscribeUser();
    };
  }, []); 

  const signup = useCallback(
    async (email: string, password: string, name: string) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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

  const login = useCallback(
    (email: string, password: string) =>
      signInWithEmailAndPassword(auth, email, password),
    []
  );

  const resetPassword = useCallback(
    (email: string) => sendPasswordResetEmail(auth, email),
    []
  );

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace(AUTH_ROUTES.login);
    } catch (error) {
      console.error(`${AUTH_MESSAGES.logoutError}:`, error);
    }
  };

  const contextValue = useMemo(
    () => ({
      user,
      userData,
      isAuthenticated: !!user,
      loading,
      signup,
      login,
      resetPassword,
      signOut: handleSignOut,
    }),
    [user, userData, loading, signup, login, resetPassword]
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