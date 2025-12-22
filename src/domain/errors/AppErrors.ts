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
    code: string = 'AUTH_ERROR',
    originalError?: Error
  ) {
    super(message, userMessage, code, originalError);
  }
}

export class TransactionError extends AppError {
  constructor(
    message: string,
    userMessage: string,
    code: string = 'TRANSACTION_ERROR',
    originalError?: Error
  ) {
    super(message, userMessage, code, originalError);
  }
}

export class NetworkError extends AppError {
  constructor(
    message: string,
    userMessage: string = 'Erro de conexão. Verifique sua internet e tente novamente.',
    code: string = 'NETWORK_ERROR',
    originalError?: Error
  ) {
    super(message, userMessage, code, originalError);
  }
}

export class StorageError extends AppError {
  constructor(
    message: string,
    userMessage: string,
    code: string = 'STORAGE_ERROR',
    originalError?: Error
  ) {
    super(message, userMessage, code, originalError);
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    userMessage: string,
    code: string = 'VALIDATION_ERROR',
    originalError?: Error
  ) {
    super(message, userMessage, code, originalError);
  }
}

export class UnknownError extends AppError {
  constructor(
    message: string = 'Erro desconhecido',
    userMessage: string = 'Ocorreu um erro inesperado. Por favor, tente novamente.',
    code: string = 'UNKNOWN_ERROR',
    originalError?: Error
  ) {
    super(message, userMessage, code, originalError);
  }
}
