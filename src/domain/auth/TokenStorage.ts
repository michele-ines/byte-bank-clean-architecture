/**
 * Interface que define o contrato para armazenamento seguro de tokens
 * Segue o princípio de Inversão de Dependência (SOLID)
 */
export interface TokenStorage {
  /**
   * Salva o token JWT no armazenamento seguro
   * @param token - Token JWT a ser armazenado
   * @returns Promise que resolve quando o token é salvo
   */
  saveToken(token: string): Promise<void>;

  /**
   * Recupera o token JWT do armazenamento seguro
   * @returns Promise que resolve com o token ou null se não existir
   */
  getToken(): Promise<string | null>;

  /**
   * Remove o token JWT do armazenamento seguro
   * @returns Promise que resolve quando o token é removido
   */
  removeToken(): Promise<void>;

  /**
   * Verifica se existe um token armazenado
   * @returns Promise que resolve com true se existe token, false caso contrário
   */
  hasToken(): Promise<boolean>;
}
