import { secureTokenStorage } from '@infrastructure/persistence/SecureTokenStorage';
import { useCallback } from 'react';

/**
 * Hook customizado para gerenciar o token JWT de forma segura
 * Encapsula a lógica de acesso ao SecureTokenStorage
 */
export const useSecureToken = () => {

  const saveToken = useCallback(async (token: string): Promise<void> => {
    await secureTokenStorage.saveToken(token);
  }, []);

  const getToken = useCallback(async (): Promise<string | null> => {
    return await secureTokenStorage.getToken();
  }, []);


  const removeToken = useCallback(async (): Promise<void> => {
    await secureTokenStorage.removeToken();
  }, []);


  const hasToken = useCallback(async (): Promise<boolean> => {
    return await secureTokenStorage.hasToken();
  }, []);

  return {
    saveToken,
    getToken,
    removeToken,
    hasToken,
  };
};
