/**
 * Obtém a data atual formatada em português brasileiro
 * @returns String com dia da semana e data formatada (ex: "Segunda-feira, 15/01/2024")
 */
export function getCurrentDate(): string {
  const options: Intl.DateTimeFormatOptions = { weekday: "long" };
  const today = new Date();
  const weekday = today
    .toLocaleDateString("pt-BR", options)
    .replace(/^\w/, (c) => c.toUpperCase());
  const formattedDate = today.toLocaleDateString("pt-BR");
  return `${weekday}, ${formattedDate}`;
}
