export type ToastType = "success" | "error";
export type TransactionType = "deposito" | "cambio" | "transferencia";
export const transactionTypeItems = [
  { label: "Depósito", value: "deposito" },
  { label: "Câmbio", value: "cambio" },
  { label: "Transferência", value: "transferencia" },
];