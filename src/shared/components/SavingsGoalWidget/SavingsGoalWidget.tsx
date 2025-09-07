import { tokens } from "@/src/theme/tokens";
import React from "react";
import { Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { styles } from "./SavingsGoalWidget.styles";

interface Transaction {
  tipo: "entrada" | "saida";
  valor: number;
}

interface SavingsGoalProps {
  goal: number;
  transactions: Transaction[];
}

export default function SavingsGoalWidget({ goal, transactions }: SavingsGoalProps) {
  const saved = transactions
    .filter((tx) => tx.tipo === "entrada")
    .reduce((total, tx) => total + tx.valor, 0);

  const percentage = Math.min(saved / goal, 1);

  return (
    <View
      style={styles.container}
      accessibilityLabel={tokens.a11ySavingsGoal}
    >
      <Text style={styles.title}>{tokens.textMetaEconomia}</Text>
      <Text>
        {tokens.textMetaAtual}: R$ {goal}
      </Text>
      <Text>
        {tokens.textEconomizado}: R$ {saved}
      </Text>

      <Progress.Bar
        progress={percentage}
        width={null}
        height={tokens.spacingXs} 
        color={styles.progressBar.backgroundColor}
        borderRadius={tokens.radiusSm} 
      />

      <Text style={styles.status}>
        {percentage >= 1
          ? tokens.textParabens 
          : `${tokens.textProgresso} ${(percentage * 100).toFixed(1)}%`}
      </Text>
    </View>
  );
}
