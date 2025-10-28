import {
    User as FirebaseUser,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';

import { AuthCredentials, SignupCredentials } from '@domain/entities/AuthCredentials';
import { AuthenticatedUser, UserData } from '@domain/entities/User';
import { AuthRepository } from '@domain/repositories/AuthRepository';
import { auth, db } from '../config/firebaseConfig';

const mapFirebaseUserToAuthenticatedUser = (firebaseUser: FirebaseUser | null): AuthenticatedUser | null => {
  if (!firebaseUser) return null;
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
  };
};

export class FirebaseAuthRepository implements AuthRepository {
  getCurrentUser(): AuthenticatedUser | null {
    return mapFirebaseUserToAuthenticatedUser(auth.currentUser);
  }

  onAuthStateChanged(callback: (user: AuthenticatedUser | null) => void): () => void {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      callback(mapFirebaseUserToAuthenticatedUser(firebaseUser));
    });
    return unsubscribe; 
  }

  onUserDataChanged(uid: string, callback: (userData: UserData | null) => void): () => void {
      const docRef = doc(db, "users", uid);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          callback(docSnap.data() as UserData);
        } else {
          callback(null);
        }
      });
      return unsubscribe;
  }

  async login(credentials: AuthCredentials): Promise<AuthenticatedUser> {
    const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password!);
    const authenticatedUser = mapFirebaseUserToAuthenticatedUser(userCredential.user);
    if (!authenticatedUser) {
        throw new Error('Falha ao mapear usuário após login.');
    }
    return authenticatedUser;
  }

  async signup(credentials: SignupCredentials): Promise<AuthenticatedUser> {
    const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password!);
    const newUser = userCredential.user;

    const newUserProfile: UserData = {
        uuid: newUser.uid,
        name: credentials.name,
        email: credentials.email,
        createdAt: serverTimestamp(),
    };
    await this.createUserProfile(newUserProfile);

    const authenticatedUser = mapFirebaseUserToAuthenticatedUser(newUser);
     if (!authenticatedUser) {
        throw new Error('Falha ao mapear usuário após signup.');
    }
    return authenticatedUser;
  }

  async createUserProfile(userData: UserData): Promise<void> {
     await setDoc(doc(db, "users", userData.uuid), userData);
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  }
}