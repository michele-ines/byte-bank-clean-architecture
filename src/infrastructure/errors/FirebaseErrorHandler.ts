import { authErrorMessages, firestoreErrorMessages, networkErrorCodes, storageErrorMessages } from '@/shared/constants/firebase';
import {
    AuthError,
    NetworkError,
    StorageError,
    TransactionError,
    UnknownError,
    type AppError
} from '@domain/errors/AppErrors';

import { FirebaseError } from 'firebase/app';


export class FirebaseErrorHandler {
  static handle(error: unknown): AppError {
    if (error instanceof FirebaseError) {
      return this.handleFirebaseError(error);
    }

    if (error instanceof Error) {
      return new UnknownError(
        error.message,
        'Ocorreu um erro inesperado. Por favor, tente novamente.',
        'UNKNOWN_ERROR',
        error
      );
    }

    return new UnknownError(
      String(error),
      'Ocorreu um erro inesperado. Por favor, tente novamente.'
    );
  }

  private static handleFirebaseError(error: FirebaseError): AppError {
    const errorCode = error.code;

    if (networkErrorCodes.includes(errorCode)) {
      return new NetworkError(
        error.message,
        'Erro de conexão. Verifique sua internet e tente novamente.',
        'NETWORK_ERROR',
        error
      );
    }

    if (errorCode.startsWith('auth/')) {
      return this.handleAuthError(error);
    }

    if (errorCode.startsWith('storage/')) {
      return this.handleStorageError(error);
    }

    if (this.isFirestoreError(errorCode)) {
      return this.handleFirestoreError(error);
    }

    return new UnknownError(
      error.message,
      'Ocorreu um erro inesperado. Por favor, tente novamente.',
      errorCode,
      error
    );
  }

  private static handleAuthError(error: FirebaseError): AuthError {
    const mapping = authErrorMessages[error.code];
    
    if (mapping) {
      return new AuthError(
        error.message,
        mapping.userMessage,
        mapping.code,
        error
      );
    }

    return new AuthError(
      error.message,
      'Erro de autenticação. Por favor, tente novamente.',
      error.code,
      error
    );
  }

  private static handleStorageError(error: FirebaseError): StorageError {
    const mapping = storageErrorMessages[error.code];
    
    if (mapping) {
      return new StorageError(
        error.message,
        mapping.userMessage,
        mapping.code,
        error
      );
    }

    return new StorageError(
      error.message,
      'Erro ao processar arquivo. Por favor, tente novamente.',
      error.code,
      error
    );
  }

  private static handleFirestoreError(error: FirebaseError): TransactionError {
    const mapping = firestoreErrorMessages[error.code];
    
    if (mapping) {
      return new TransactionError(
        error.message,
        mapping.userMessage,
        mapping.code,
        error
      );
    }

    return new TransactionError(
      error.message,
      'Erro ao processar transação. Por favor, tente novamente.',
      error.code,
      error
    );
  }

  private static isFirestoreError(code: string): boolean {
    return Object.keys(firestoreErrorMessages).includes(code);
  }
}
