import type { SignupCredentials } from '@domain/entities/AuthCredentials';
import type { AuthenticatedUser, UserData } from '@domain/entities/User';
import type { User as FirebaseUser } from 'firebase/auth';
import type { DocumentData } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';

export const mapFirebaseUserToAuthenticatedUser = (firebaseUser: FirebaseUser | null): AuthenticatedUser | null => {
  if (!firebaseUser) return null;
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
  };
};

export const mapDocumentToUserData = (raw: DocumentData | undefined): UserData | null => {
  if (typeof raw !== "object" || raw === null) {
    return null;
  }

  const obj = raw;

  const data: UserData = {
    uuid: typeof obj.uuid === "string" ? obj.uuid : "",
    name: typeof obj.name === "string" ? obj.name : "",
    email: typeof obj.email === "string" ? obj.email : "",
    photoURL: typeof obj.photoURL === "string" ? obj.photoURL : null,
    createdAt: obj.createdAt ?? undefined,
  };

  if (!data.uuid || !data.name || !data.email) {
     return null;
  }

  return data;
};

export const mapSignupToNewUserProfile = (credentials: SignupCredentials, uid: string): UserData => {
  return {
    uuid: uid,
    name: credentials.name,
    email: credentials.email,
    createdAt: serverTimestamp(),
  };
};