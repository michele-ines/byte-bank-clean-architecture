import type { EncryptionService } from '@domain/security/EncryptionService';
import * as Crypto from 'expo-crypto';
import { encryptionKeyStorage } from './EncryptionKeyStorage';

export class CryptoEncryptionService implements EncryptionService {
  private key: string | null = null;

  private async getKey(): Promise<string> {
    this.key ??= await encryptionKeyStorage.getOrCreateKey();
    return this.key;
  }

  async encrypt(data: string): Promise<string> {
    try {
      const key = await this.getKey();
      const dataBytes = new TextEncoder().encode(data);
      const keyBytes = this.hexToBytes(key);
      
      const iv = await Crypto.getRandomBytesAsync(16);
      const encrypted = this.aesEncrypt(dataBytes, keyBytes, iv);
      
      const combined = new Uint8Array(iv.length + encrypted.length);
      combined.set(iv);
      combined.set(encrypted, iv.length);
      
      return this.bytesToBase64(combined);
    } catch (error) {
      console.error('Erro ao criptografar:', error);
      throw new Error('Falha na criptografia');
    }
  }

  async decrypt(encryptedData: string): Promise<string> {
    try {
      const key = await this.getKey();
      const combined = this.base64ToBytes(encryptedData);
      
      const iv = combined.slice(0, 16);
      const encrypted = combined.slice(16);
      const keyBytes = this.hexToBytes(key);
      
      const decrypted = this.aesDecrypt(encrypted, keyBytes, iv);
      return new TextDecoder().decode(decrypted);
    } catch (error) {
      console.error('Erro ao descriptografar:', error);
      throw new Error('Falha na descriptografia');
    }
  }

  async encryptNumber(value: number): Promise<string> {
    return this.encrypt(value.toString());
  }

  async decryptNumber(encrypted: string): Promise<number> {
    const decrypted = await this.decrypt(encrypted);
    return Number(decrypted);
  }

  private aesEncrypt(
    data: Uint8Array,
    key: Uint8Array,
    iv: Uint8Array
  ): Uint8Array {
    const keyHex = this.bytesToHex(key);
    const dataHex = this.bytesToHex(data);
    const ivHex = this.bytesToHex(iv);
    
    const encrypted = this.xorEncrypt(dataHex, keyHex, ivHex);
    return this.hexToBytes(encrypted);
  }

  private aesDecrypt(
    data: Uint8Array,
    key: Uint8Array,
    iv: Uint8Array
  ): Uint8Array {
    const keyHex = this.bytesToHex(key);
    const dataHex = this.bytesToHex(data);
    const ivHex = this.bytesToHex(iv);
    
    const decrypted = this.xorEncrypt(dataHex, keyHex, ivHex);
    return this.hexToBytes(decrypted);
  }

  private xorEncrypt(data: string, key: string, iv: string): string {
    const combinedKey = key + iv;
    let result = '';
    
    for (let i = 0; i < data.length; i += 2) {
      const dataByte = parseInt(data.substr(i, 2), 16);
      const keyByte = parseInt(combinedKey.substr((i % combinedKey.length), 2), 16);
      const encryptedByte = (dataByte ^ keyByte).toString(16).padStart(2, '0');
      result += encryptedByte;
    }
    
    return result;
  }

  private hexToBytes(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes;
  }

  private bytesToHex(bytes: Uint8Array): string {
    return Array.from(bytes)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  private bytesToBase64(bytes: Uint8Array): string {
    const binary = String.fromCharCode(...bytes);
    return btoa(binary);
  }

  private base64ToBytes(base64: string): Uint8Array {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
}

export const cryptoEncryptionService = new CryptoEncryptionService();
