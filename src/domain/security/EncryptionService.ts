export interface EncryptionService {
  encrypt(data: string): Promise<string>;
  decrypt(data: string): Promise<string>;
  encryptNumber(value: number): Promise<string>;
  decryptNumber(encrypted: string): Promise<number>;
}
