export abstract class AppError extends Error {
  public readonly userMessage: string;
  public readonly code: string;
  public readonly originalError?: Error;

  constructor(
    message: string,
    userMessage: string,
    code: string,
    originalError?: Error
  ) {
    super(message);
    this.name = this.constructor.name;
    this.userMessage = userMessage;
    this.code = code;
    this.originalError = originalError;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class AuthError extends AppError {
  constructor(
    message: string,
    userMessage: string,
    code = 'AUTH_ERROR',
    originalError?: Error
  ) {
    super(message, userMessage, code, originalError);
  }
}

export class TransactionError extends AppError {
  constructor(
    message: string,
    userMessage: string,
    code = 'TRANSACTION_ERROR',
    originalError?: Error
  ) {
    super(message, userMessage, code, originalError);
  }
}

export class NetworkError extends AppError {
  constructor(
    message: string,
    userMessage = 'Erro de conexão. Verifique sua internet e tente novamente.',
    code = 'NETWORK_ERROR',
    originalError?: Error
  ) {
    super(message, userMessage, code, originalError);
  }
}

export class StorageError extends AppError {
  constructor(
    message: string,
    userMessage: string,
    code = 'STORAGE_ERROR',
    originalError?: Error
  ) {
    super(message, userMessage, code, originalError);
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    userMessage: string,
    code = 'VALIDATION_ERROR',
    originalError?: Error
  ) {
    super(message, userMessage, code, originalError);
  }
}

export class UnknownError extends AppError {
  constructor(
    message = 'Erro desconhecido',
    userMessage = 'Ocorreu um erro inesperado. Por favor, tente novamente.',
    code = 'UNKNOWN_ERROR',
    originalError?: Error
  ) {
    super(message, userMessage, code, originalError);
  }
}
