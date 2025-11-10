import type { TokenStorage } from '@domain/auth/TokenStorage';
import * as SecureStore from 'expo-secure-store';


export class SecureTokenStorage implements TokenStorage {
  private readonly TOKEN_KEY = 'bytebankjwttoken';


  async saveToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(this.TOKEN_KEY, token);
    } catch (error) {
      console.error('Erro ao salvar token:', error);
      throw new Error('Falha ao salvar token de autenticação');
    }
  }

  async getToken(): Promise<string | null> {
    try {
      const token = await SecureStore.getItemAsync(this.TOKEN_KEY);
      return token;
    } catch (error) {
      console.error('Erro ao recuperar token:', error);
      return null;
    }
  }

  async removeToken(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(this.TOKEN_KEY);
    } catch (error) {
      console.error('Erro ao remover token:', error);
      throw new Error('Falha ao remover token de autenticação');
    }
  }


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

export const secureTokenStorage = new SecureTokenStorage();
