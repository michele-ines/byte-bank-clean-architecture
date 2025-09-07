import FinancialChart from "@/src/components/FinancialChart/FinancialChart";
import { useWidgetPreferences } from "@/src/contexts/WidgetPreferencesContext";
import React from "react";
import { ScrollView, Text } from "react-native";

import SavingsGoalWidget from "../shared/components/SavingsGoalWidget/SavingsGoalWidget";
import SpendingAlertWidget from "../shared/components/SpendingAlertWidget/SpendingAlertWidget";
import WidgetPreferencesButton from "../shared/components/WidgetPreferencesButton/WidgetPreferencesButton";
import { styles } from "./ServicesScreen.styles";

type Transaction = {
  tipo: "entrada" | "saida";
  valor: number;
};

const transactions: Transaction[] = [
  { tipo: "entrada", valor: 500 },
  { tipo: "saida", valor: 200 },
  { tipo: "saida", valor: 300 },
];

const ServicesScreen: React.FC = () => {
  const { preferences } = useWidgetPreferences();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title} accessibilityRole="header">
        Outros serviços
      </Text>

      <WidgetPreferencesButton />

      <FinancialChart />

      {preferences.spendingAlert && (
        <SpendingAlertWidget limit={400} transactions={transactions} />
      )}

      {preferences.savingsGoal && (
        <SavingsGoalWidget goal={1000} transactions={transactions} />
      )}
    </ScrollView>
  );
};

export default ServicesScreen;
