import { tokens } from "@/src/theme/tokens";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./SpendingAlertWidget.styles";

interface Transaction {
  tipo: "entrada" | "saida";
  valor: number;
}

interface SpendingAlertProps {
  limit: number;
  transactions: Transaction[];
}

export default function SpendingAlertWidget({ limit, transactions }: SpendingAlertProps) {
  const gastos = transactions
    .filter((tx) => tx.tipo === "saida")
    .reduce((total, tx) => total + tx.valor, 0);

  const alert = gastos > limit;

  return (
    <View
      style={styles.container}
      accessibilityLabel={tokens.a11ySpendingAlert}
    >
      <Text style={styles.title}>{tokens.textAlertaGastos}</Text>
      <Text>
        {tokens.textLimiteMensal}: R$ {limit}
      </Text>
      <Text>
        {tokens.textTotalGasto}: R$ {gastos}
      </Text>

      {alert ? (
        <Text style={styles.alert}>{tokens.textUltrapassouLimite}</Text>
      ) : (
        <Text style={styles.ok}>{tokens.textDentroLimite}</Text>
      )}
    </View>
  );
}
