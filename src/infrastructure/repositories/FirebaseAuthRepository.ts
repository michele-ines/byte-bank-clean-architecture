import type { TokenStorage } from '@domain/auth/TokenStorage';
import type { AuthCredentials, SignupCredentials } from '@domain/entities/AuthCredentials';
import type { AuthenticatedUser, UserData } from '@domain/entities/User';
import type { AuthRepository } from '@domain/repositories/AuthRepository';
import type { Auth } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import {
  mapDocumentToUserData,
  mapFirebaseUserToAuthenticatedUser,
  mapSignupToNewUserProfile
} from '../mappers/user.mapper';

export class FirebaseAuthRepository implements AuthRepository {

  constructor(
    private readonly auth: Auth, 
    private readonly firestore: Firestore,
    private readonly tokenStorage: TokenStorage
  ) {}

  getCurrentUser(): AuthenticatedUser | null {
    return mapFirebaseUserToAuthenticatedUser(this.auth.currentUser);
  }

  onAuthStateChanged(callback: (user: AuthenticatedUser | null) => void): () => void {
    const unsubscribe = onAuthStateChanged(this.auth, (firebaseUser) => {
      callback(mapFirebaseUserToAuthenticatedUser(firebaseUser));
    });
    return unsubscribe; 
  }

  onUserDataChanged(uid: string, callback: (userData: UserData | null) => void): () => void {
    const docRef = doc(this.firestore, "users", uid);

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
    const userCredential = await signInWithEmailAndPassword(this.auth, credentials.email, pw);
    
    try {
      const token = await userCredential.user.getIdToken();
      await this.tokenStorage.saveToken(token);
    } catch (error) {
      console.error('Erro ao salvar token no login:', error);
    }
    
    const authenticatedUser = mapFirebaseUserToAuthenticatedUser(userCredential.user);
    if (!authenticatedUser) {
        throw new Error('Falha ao mapear usuário após login.');
    }
    return authenticatedUser;
  }

  async signup(credentials: SignupCredentials): Promise<AuthenticatedUser> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password);
    const newUser = userCredential.user;

    const newUserProfile = mapSignupToNewUserProfile(credentials, newUser.uid);
    await this.createUserProfile(newUserProfile);

    try {
      const token = await newUser.getIdToken();
      await this.tokenStorage.saveToken(token);
    } catch (error) {
      console.error('Erro ao salvar token no signup:', error);
    }

    const authenticatedUser = mapFirebaseUserToAuthenticatedUser(newUser);
     if (!authenticatedUser) {
        throw new Error('Falha ao mapear usuário após signup.');
    }
    return authenticatedUser;
  }

  async createUserProfile(userData: UserData): Promise<void> {
     await setDoc(doc(this.firestore, "users", userData.uuid), userData, { merge: true });
  }

  async logout(): Promise<void> {
    try {
      await this.tokenStorage.removeToken();
    } catch (error) {
      console.error('Erro ao remover token no logout:', error);
    }
    await signOut(this.auth);
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }
}
