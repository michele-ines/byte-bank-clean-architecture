import type { TokenStorage } from '@domain/auth/TokenStorage';
import * as SecureStore from 'expo-secure-store';

/**
 * Implementação concreta do armazenamento seguro de tokens usando expo-secure-store
 * Esta classe está na camada de infrastructure, isolando a dependência externa
 */
export class SecureTokenStorage implements TokenStorage {
  private readonly TOKEN_KEY = 'bytebankjwttoken';

  /**
   * Salva o token JWT no SecureStore
   * @param token - Token JWT a ser armazenado
   */
  async saveToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(this.TOKEN_KEY, token);
    } catch (error) {
      console.error('Erro ao salvar token:', error);
      throw new Error('Falha ao salvar token de autenticação');
    }
  }

  /**
   * Recupera o token JWT do SecureStore
   * @returns Token JWT ou null se não existir
   */
  async getToken(): Promise<string | null> {
    try {
      const token = await SecureStore.getItemAsync(this.TOKEN_KEY);
      return token;
    } catch (error) {
      console.error('Erro ao recuperar token:', error);
      return null;
    }
  }

  /**
   * Remove o token JWT do SecureStore
   */
  async removeToken(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(this.TOKEN_KEY);
    } catch (error) {
      console.error('Erro ao remover token:', error);
      throw new Error('Falha ao remover token de autenticação');
    }
  }

  /**
   * Verifica se existe um token armazenado
   * @returns true se existe token, false caso contrário
   */
  async hasToken(): Promise<boolean> {
    try {
      const token = await this.getToken();
      return token !== null && token.length > 0;
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      return false;
    }
  }
}

// Exporta uma instância única (singleton pattern)
export const secureTokenStorage = new SecureTokenStorage();
