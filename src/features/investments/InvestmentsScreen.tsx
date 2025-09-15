import { InvestmentSummaryCard } from "@/src/components/InvestmentSummaryCard/InvestmentSummaryCard";
import React from "react";
import { View } from "react-native";
import { styles } from "./InvestmentsScreen.styles";

const InvestmentsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <InvestmentSummaryCard />
      {/* <CardListExtract
        title="Investimentos"
        filterFn={(t) => t.description.toLowerCase().includes("investimento")}
      /> */}
    </View>
  );
};

export default InvestmentsScreen;
