import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';

export class EncryptionKeyStorage {
  private readonly ENCRYPTION_KEY = 'bytebankencryptionkey';

  async getOrCreateKey(): Promise<string> {
    try {
      let key = await SecureStore.getItemAsync(this.ENCRYPTION_KEY);
      
      if (!key) {
        key = await this.generateKey();
        await SecureStore.setItemAsync(this.ENCRYPTION_KEY, key);
      }
      
      return key;
    } catch (error) {
      console.error('Erro ao obter/criar chave de criptografia:', error);
      throw new Error('Falha ao gerenciar chave de criptografia');
    }
  }

  private async generateKey(): Promise<string> {
    const randomBytes = await Crypto.getRandomBytesAsync(32);
    return this.bytesToHex(randomBytes);
  }

  private bytesToHex(bytes: Uint8Array): string {
    return Array.from(bytes)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  async removeKey(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(this.ENCRYPTION_KEY);
    } catch (error) {
      console.error('Erro ao remover chave de criptografia:', error);
    }
  }
}

export const encryptionKeyStorage = new EncryptionKeyStorage();
