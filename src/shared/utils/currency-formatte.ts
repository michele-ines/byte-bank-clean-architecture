export const formatBRL = (value: number): string =>
  `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

export const parseBRL = (input: string): number => {
  const cleaned = input.replace(/[^\d.,]/g, "");
  const noThousands = cleaned.replace(/\./g, "");
  const normalized = noThousands.replace(",", ".");
  return parseFloat(normalized) || 0;
};

export const formatTipo = (raw?: string): string => {
  if (!raw) return "";

  const map: Record<string, string> = {
    deposito: "Depósito",
    retirada: "Retirada",
    transferencia: "Transferência",
    pagamento: "Pagamento",
  };

  const lower = raw.toLowerCase();
  return map[lower] ?? lower.charAt(0).toUpperCase() + lower.slice(1);
};

export const maskCurrency = (valor?: string): string => {
  if (!valor) return "";

  let numeros = valor.replace(/\D/g, "");
  numeros = numeros.slice(0, 11);

  const inteiro = numeros.slice(0, -2) || "0";
  const decimal = numeros.slice(-2).padStart(2, "0");
  const numeroFinal = `${inteiro}.${decimal}`;

  return Number(numeroFinal).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};


export function formatCurrencyToBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
