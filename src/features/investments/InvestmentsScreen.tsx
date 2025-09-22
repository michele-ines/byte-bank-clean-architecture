import { InvestmentSummaryCard } from "@/src/components/cards/InvestmentSummaryCard/InvestmentSummaryCard";
import { ScreenWrapper } from "@/src/components/common/ScreenWrapper/ScreenWrapper";
import { UserInfo } from "firebase/auth";
import React from "react";
import { View } from "react-native";
import { styles } from "./InvestmentsScreen.styles";

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

const InvestmentsScreen: React.FC = () => {
  return (
        <ScreenWrapper>
    
    <View style={styles.container}>
      <InvestmentSummaryCard />
      {/* <CardListExtract
        title="Investimentos"
        filterFn={(t) => t.description.toLowerCase().includes("investimento")}
      /> */}
    </View>
    </ScreenWrapper>
    
  );
};

export default InvestmentsScreen;
