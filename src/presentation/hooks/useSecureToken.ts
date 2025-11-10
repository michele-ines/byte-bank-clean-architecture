import { secureTokenStorage } from '@infrastructure/persistence/SecureTokenStorage';
import { useCallback } from 'react';

interface UseSecureTokenReturn {
  saveToken: (token: string) => Promise<void>;
  getToken: () => Promise<string | null>;
  removeToken: () => Promise<void>;
  hasToken: () => Promise<boolean>;
}

export const useSecureToken = (): UseSecureTokenReturn => {

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
