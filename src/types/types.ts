import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

export type ToastType = "success" | "error";
export type TransactionType = "deposito" | "cambio" | "transferencia";
export const TransactionTypeItems = [
  { label: "Depósito", value: "deposito" },
  { label: "Câmbio", value: "cambio" },
  { label: "Transferência", value: "transferencia" },
];


export type PortfolioItem = {
  name: string;
  value: number;
  color: string;
};


export type DonutChartProps = {
  data: PortfolioItem[];
  radius?: number;
  strokeWidth?: number;
} & ViewProps; 
