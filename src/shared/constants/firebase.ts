import type { ErrorMapping } from "../interfaces/error.interface";

export const authErrorMessages: Record<string, ErrorMapping> = {
  'auth/email-already-in-use': {
    userMessage: 'Este e-mail já está cadastrado. Tente fazer login ou use outro e-mail.',
    code: 'EMAIL_IN_USE',
  },
  'auth/invalid-email': {
    userMessage: 'O e-mail fornecido é inválido. Verifique e tente novamente.',
    code: 'INVALID_EMAIL',
  },
  'auth/user-not-found': {
    userMessage: 'Usuário não encontrado. Verifique suas credenciais.',
    code: 'USER_NOT_FOUND',
  },
  'auth/wrong-password': {
    userMessage: 'Senha incorreta. Tente novamente ou redefina sua senha.',
    code: 'WRONG_PASSWORD',
  },
  'auth/weak-password': {
    userMessage: 'A senha é muito fraca. Use pelo menos 6 caracteres.',
    code: 'WEAK_PASSWORD',
  },
  'auth/invalid-credential': {
    userMessage: 'Credenciais inválidas. Verifique seu e-mail e senha.',
    code: 'INVALID_CREDENTIAL',
  },
  'auth/user-disabled': {
    userMessage: 'Esta conta foi desabilitada. Entre em contato com o suporte.',
    code: 'USER_DISABLED',
  },
  'auth/operation-not-allowed': {
    userMessage: 'Operação não permitida. Entre em contato com o suporte.',
    code: 'OPERATION_NOT_ALLOWED',
  },
  'auth/requires-recent-login': {
    userMessage: 'Esta operação requer login recente. Faça login novamente.',
    code: 'REQUIRES_RECENT_LOGIN',
  },
  'auth/expired-action-code': {
    userMessage: 'O código de ação expirou. Solicite um novo.',
    code: 'EXPIRED_ACTION_CODE',
  },
  'auth/invalid-action-code': {
    userMessage: 'O código de ação é inválido. Verifique e tente novamente.',
    code: 'INVALID_ACTION_CODE',
  },
  'auth/too-many-requests': {
    userMessage: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.',
    code: 'TOO_MANY_REQUESTS',
  },
};

export const networkErrorCodes = [
  'unavailable',
  'network-request-failed',
  'auth/network-request-failed',
  'offline',
];

export const storageErrorMessages: Record<string, ErrorMapping> = {
  'storage/unauthorized': {
    userMessage: 'Você não tem permissão para acessar este arquivo.',
    code: 'STORAGE_UNAUTHORIZED',
  },
  'storage/canceled': {
    userMessage: 'Upload cancelado.',
    code: 'STORAGE_CANCELED',
  },
  'storage/unknown': {
    userMessage: 'Erro ao processar arquivo. Tente novamente.',
    code: 'STORAGE_UNKNOWN',
  },
  'storage/object-not-found': {
    userMessage: 'Arquivo não encontrado.',
    code: 'STORAGE_NOT_FOUND',
  },
  'storage/quota-exceeded': {
    userMessage: 'Limite de armazenamento excedido.',
    code: 'STORAGE_QUOTA_EXCEEDED',
  },
  'storage/retry-limit-exceeded': {
    userMessage: 'Tempo limite excedido. Tente novamente.',
    code: 'STORAGE_RETRY_LIMIT',
  },
};

export const firestoreErrorMessages: Record<string, ErrorMapping> = {
  'permission-denied': {
    userMessage: 'Você não tem permissão para realizar esta operação.',
    code: 'PERMISSION_DENIED',
  },
  'not-found': {
    userMessage: 'Documento não encontrado.',
    code: 'NOT_FOUND',
  },
  'already-exists': {
    userMessage: 'Este registro já existe.',
    code: 'ALREADY_EXISTS',
  },
  'resource-exhausted': {
    userMessage: 'Limite de requisições excedido. Tente novamente mais tarde.',
    code: 'RESOURCE_EXHAUSTED',
  },
  'failed-precondition': {
    userMessage: 'Operação não pode ser executada no estado atual.',
    code: 'FAILED_PRECONDITION',
  },
  'aborted': {
    userMessage: 'Operação cancelada devido a conflito. Tente novamente.',
    code: 'ABORTED',
  },
  'out-of-range': {
    userMessage: 'Operação fora do intervalo válido.',
    code: 'OUT_OF_RANGE',
  },
  'unimplemented': {
    userMessage: 'Operação não implementada.',
    code: 'UNIMPLEMENTED',
  },
  'internal': {
    userMessage: 'Erro interno do servidor. Tente novamente.',
    code: 'INTERNAL',
  },
  'data-loss': {
    userMessage: 'Perda de dados detectada. Entre em contato com o suporte.',
    code: 'DATA_LOSS',
  },
  'unauthenticated': {
    userMessage: 'Você precisa estar autenticado para realizar esta operação.',
    code: 'UNAUTHENTICATED',
  },
};
