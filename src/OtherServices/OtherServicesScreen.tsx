import FinancialChart from "@/src/components/FinancialChart/FinancialChart";
import { useWidgetPreferences } from "@/src/contexts/WidgetPreferencesContext";
import React from "react";
import { Text, View } from "react-native";

import { ScreenWrapper } from "@/src/components/common/ScreenWrapper/ScreenWrapper";
import { UserInfo } from "firebase/auth";
import SavingsGoalWidget from "../shared/components/SavingsGoalWidget/SavingsGoalWidget";
import SpendingAlertWidget from "../shared/components/SpendingAlertWidget/SpendingAlertWidget";
import WidgetPreferencesButton from "../shared/components/WidgetPreferencesButton/WidgetPreferencesButton";
import { styles } from "./OtherServicesScreen.styles";

type Transaction = {
  tipo: "entrada" | "saida";
  valor: number;
};

const transactions: Transaction[] = [
  { tipo: "entrada", valor: 500 },
  { tipo: "saida", valor: 200 },
  { tipo: "saida", valor: 300 },
];

const user = {
  displayName: "Joana",
} as UserInfo;

const balance = { account: "corrente", value: 209021 };

const ServicesScreen: React.FC = () => {
  const { preferences } = useWidgetPreferences();

  return (



      <ScreenWrapper>
        <View style={styles.container} >
            <Text style={styles.title} accessibilityRole="header">
              Outros serviços
            </Text>

            {/* Botão de preferências */}
            <WidgetPreferencesButton />

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
