/**
 * Extrai o primeiro nome de um nome completo
 * @param fullName - Nome completo do usuário (pode ser string, undefined ou null)
 * @returns Primeiro nome ou string vazia se não fornecido
 */
export function getFirstName(fullName?: string | null): string {
  if (!fullName) return "";
  return fullName.trim().split(" ")[0] || "";
}

/**
 * Trunca uma string se ela exceder o tamanho máximo
 * @param text - Texto a ser truncado
 * @param maxLength - Comprimento máximo permitido
 * @returns Texto truncado com reticências, se necessário
 */
export const truncateString = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
};
