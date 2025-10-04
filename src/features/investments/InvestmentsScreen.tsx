import { InvestmentSummaryCard } from "@/src/components/cards/InvestmentSummaryCard/InvestmentSummaryCard";
import { ScreenWrapper } from "@/src/components/common/ScreenWrapper/ScreenWrapper";
import React from "react";
import { View } from "react-native";
import { styles } from "./InvestmentsScreen.styles";


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
