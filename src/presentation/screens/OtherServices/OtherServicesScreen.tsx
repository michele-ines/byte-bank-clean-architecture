
import FinancialChart from "@presentation/components/charts/FinancialChart";
import { ScreenWrapper } from "@presentation/components/common/common/ScreenWrapper/ScreenWrapper";
import { useWidgetPreferences } from "@presentation/state/WidgetPreferencesContext";
import SavingsGoalWidget from "@shared/components/SavingsGoalWidget/SavingsGoalWidget";
import SpendingAlertWidget from "@shared/components/SpendingAlertWidget/SpendingAlertWidget";
import WidgetPreferencesButton from "@shared/components/WidgetPreferencesButton/WidgetPreferencesButton";
import { Transaction } from "@shared/ProfileStyles/profile.styles.types";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./OtherServicesScreen.styles";


const transactions: Transaction[] = [
  { tipo: "entrada", valor: 500 },
  { tipo: "saida", valor: 200 },
  { tipo: "saida", valor: 300 },
];

const ServicesScreen: React.FC = () => {
  const { preferences } = useWidgetPreferences();

  return (
    <ScreenWrapper>
      <WidgetPreferencesButton style={styles.widgetButton} />

      <View style={styles.container} >
        <Text style={styles.title} accessibilityRole="header">
          Outros serviços
        </Text>

        <FinancialChart />

        {preferences.spendingAlert && (
          <SpendingAlertWidget limit={400} transactions={transactions} />
        )}

        {preferences.savingsGoal && (
          <SavingsGoalWidget goal={1000} transactions={transactions} />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default ServicesScreen;
