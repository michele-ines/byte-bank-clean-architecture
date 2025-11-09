import type { AuthCredentials, SignupCredentials } from '@domain/entities/AuthCredentials';
import type { AuthenticatedUser, UserData } from '@domain/entities/User';
import type { ILoggerService } from '@domain/interfaces/log.Interfaces';
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
  mapSignupToNewUserProfile,
} from '../mappers/user.mapper';

export class FirebaseAuthRepository implements AuthRepository {
  constructor(
    private readonly auth: Auth,
    private readonly firestore: Firestore,
    private readonly logger: ILoggerService 
  ) {}

  getCurrentUser(): AuthenticatedUser | null {
    return mapFirebaseUserToAuthenticatedUser(this.auth.currentUser);
  }

  onAuthStateChanged(
    callback: (user: AuthenticatedUser | null) => void
  ): () => void {
    const unsubscribe = onAuthStateChanged(
      this.auth,
      (firebaseUser) => {
        callback(mapFirebaseUserToAuthenticatedUser(firebaseUser));
      },
      (error) => {
        this.logger.error('Erro no onAuthStateChanged', error);
      }
    );
    return unsubscribe;
  }

  onUserDataChanged(
    uid: string,
    callback: (userData: UserData | null) => void
  ): () => void {
    const docRef = doc(this.firestore, 'users', uid);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (!docSnap.exists()) {
        callback(null);
        return;
      }
      const raw = docSnap.data();
      const data = mapDocumentToUserData(raw);
      callback(data);
    }, (error) => {
        this.logger.error('Erro no onUserDataChanged', error, { uid });
    });

    return unsubscribe;
  }

  async login(credentials: AuthCredentials): Promise<AuthenticatedUser> {
    try {
      const pw = credentials.password;
      if (!pw) {
          this.logger.warn('Tentativa de login sem senha', { email: credentials.email });
          throw new Error('Password is required for login');
      }
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        credentials.email,
        pw
      );
      const authenticatedUser = mapFirebaseUserToAuthenticatedUser(
        userCredential.user
      );
      if (!authenticatedUser) {
        throw new Error('Falha ao mapear usuário após login.');
      }
      return authenticatedUser;
    } catch (error) {
      this.logger.error('Erro em FirebaseAuthRepository.login', error as Error, {
        email: credentials.email,
      });
      throw error; 
    }
  }

  async signup(credentials: SignupCredentials): Promise<AuthenticatedUser> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      );
      const newUser = userCredential.user;

      const newUserProfile = mapSignupToNewUserProfile(credentials, newUser.uid);
      await this.createUserProfile(newUserProfile);

      const authenticatedUser = mapFirebaseUserToAuthenticatedUser(newUser);
      if (!authenticatedUser) {
        throw new Error('Falha ao mapear usuário após signup.');
      }
      return authenticatedUser;
    } catch (error) {
      this.logger.error('Erro em FirebaseAuthRepository.signup', error as Error, {
        email: credentials.email,
      });
      throw error; 
    }
  }

  async createUserProfile(userData: UserData): Promise<void> {
    try {
      await setDoc(doc(this.firestore, 'users', userData.uuid), userData, {
        merge: true,
      });
    } catch (error) {
      this.logger.error('Erro em FirebaseAuthRepository.createUserProfile', error as Error, {
        uuid: userData.uuid,
      });
      throw error; 
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      this.logger.error('Erro em FirebaseAuthRepository.logout', error as Error);
      throw error; 
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      this.logger.error('Erro em FirebaseAuthRepository.resetPassword', error as Error, {
        email,
      });
      throw error; 
    }
  }
}