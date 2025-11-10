
export interface TokenStorage {

  saveToken(token: string): Promise<void>;

  getToken(): Promise<string | null>;

  removeToken(): Promise<void>;

  hasToken(): Promise<boolean>;
}
