import { radius, spacing, texts } from "@presentation/theme";
import type { JSX } from "react";
import React from "react";
import { Text, View } from "react-native";
import * as Progress from "react-native-progress";
import type { SavingsGoalProps } from "../../interfaces/auth.interfaces";
import { styles } from "./SavingsGoalWidget.styles";

export default function SavingsGoalWidget({
  goal,
  transactions,
}: SavingsGoalProps): JSX.Element {
  const saved = transactions
    .filter((tx) => tx.tipo === "entrada")
    .reduce((total, tx) => total + tx.valor, 0);

  const percentage = Math.min(saved / goal, 1);

  return (
    <View
      style={styles.container}
      accessibilityLabel={texts.a11ySavingsGoal}
    >
      <Text style={styles.title}>{texts.textMetaEconomia}</Text>
      <Text>
        {texts.textMetaAtual}: R$ {goal}
      </Text>
      <Text>
        {texts.textEconomizado}: R$ {saved}
      </Text>

      <Progress.Bar
        progress={percentage}
        width={null}
        height={spacing.xs}
        color={styles.progressBar.backgroundColor}
        borderRadius={radius.sm}
      />

      <Text style={styles.status}>
        {percentage >= 1
          ? texts.textParabens
          : `${texts.textProgresso} ${(percentage * 100).toFixed(1)}%`}
      </Text>
    </View>
  );
}
