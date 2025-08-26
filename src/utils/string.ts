/**
 * Extrai o primeiro nome de um nome completo
 * @param fullName - Nome completo do usuário
 * @returns Primeiro nome ou string vazia se não fornecido
 */
export function getFirstName(fullName: string): string {
  return fullName?.split(" ")[0] || "";
}
