
import { InvestmentSummaryCard } from "@presentation/components/cards/cards/InvestmentSummaryCard/InvestmentSummaryCard";
import { ScreenWrapper } from "@presentation/components/common/common/ScreenWrapper/ScreenWrapper";
import React from "react";
import { View } from "react-native";
import { styles } from "./InvestmentsScreen.styles";


const InvestmentsScreen: React.FC = () => {
  return (
    <ScreenWrapper>
    <View style={styles.container}>
      <InvestmentSummaryCard />
    </View>
    </ScreenWrapper>
    
  );
};

export default InvestmentsScreen;
