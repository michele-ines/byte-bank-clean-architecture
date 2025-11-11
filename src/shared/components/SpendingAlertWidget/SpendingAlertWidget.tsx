import { texts } from "@presentation/theme";
import type { JSX } from "react";
import React from "react";
import { Text, View } from "react-native";
import type { SpendingAlertProps } from "../../interfaces/auth.interfaces";
import { styles } from "./SpendingAlertWidget.styles";

export default function SpendingAlertWidget({
  limit,
  transactions,
}: SpendingAlertProps): JSX.Element {
  const gastos = transactions
    .filter((tx) => tx.tipo === "saida")
    .reduce((total, tx) => total + tx.valor, 0);

  const alert = gastos > limit;

  return (
    <View
      style={styles.container}
      accessibilityLabel={texts.a11ySpendingAlert}
    >
      <Text style={styles.title}>{texts.textAlertaGastos}</Text>
      <Text>
        {texts.textLimiteMensal}: R$ {limit}
      </Text>
      <Text>
        {texts.textTotalGasto}: R$ {gastos}
      </Text>

      {alert ? (
        <Text style={styles.alert}>{texts.textUltrapassouLimite}</Text>
      ) : (
        <Text style={styles.ok}>{texts.textDentroLimite}</Text>
      )}
    </View>
  );
}
