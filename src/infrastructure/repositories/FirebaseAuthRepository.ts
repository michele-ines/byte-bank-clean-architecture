import type { AuthCredentials, SignupCredentials } from '@domain/entities/AuthCredentials';
import type { AuthenticatedUser, UserData } from '@domain/entities/User';
import type { AuthRepository } from '@domain/repositories/AuthRepository';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import {
  mapDocumentToUserData,
  mapFirebaseUserToAuthenticatedUser,
  mapSignupToNewUserProfile
} from '../mappers/user.mapper';

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
      if (!docSnap.exists()) {
        callback(null);
        return;
      }
      const raw = docSnap.data();
      const data = mapDocumentToUserData(raw);
      callback(data);
    });

    return unsubscribe;
  }

  async login(credentials: AuthCredentials): Promise<AuthenticatedUser> {
    const pw = credentials.password;
    if (!pw) throw new Error('Password is required for login');
    const userCredential = await signInWithEmailAndPassword(auth, credentials.email, pw);
    const authenticatedUser = mapFirebaseUserToAuthenticatedUser(userCredential.user);
    if (!authenticatedUser) {
        throw new Error('Falha ao mapear usuário após login.');
    }
    return authenticatedUser;
  }

  async signup(credentials: SignupCredentials): Promise<AuthenticatedUser> {
    const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
    const newUser = userCredential.user;

    const newUserProfile = mapSignupToNewUserProfile(credentials, newUser.uid);
    await this.createUserProfile(newUserProfile);

    const authenticatedUser = mapFirebaseUserToAuthenticatedUser(newUser);
     if (!authenticatedUser) {
        throw new Error('Falha ao mapear usuário após signup.');
    }
    return authenticatedUser;
  }

  async createUserProfile(userData: UserData): Promise<void> {
     await setDoc(doc(db, "users", userData.uuid), userData, { merge: true });
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  }
}