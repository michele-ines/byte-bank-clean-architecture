/**
 * Extrai o primeiro nome de um nome completo
 * @param fullName - Nome completo do usuário
 * @returns Primeiro nome ou string vazia se não fornecido
 */
export function getFirstName(fullName: string): string {
  return fullName?.split(" ")[0] || "";
}



export const truncateString = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
};
