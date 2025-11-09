import { InvestmentSummaryCard } from "@presentation/components/cards/cards/InvestmentSummaryCard/InvestmentSummaryCard";
import { ScreenWrapper } from "@presentation/components/common/common/ScreenWrapper/ScreenWrapper";
import { markEnd, markStart } from "@shared/utils/performance";
import React, { useEffect } from "react";
import { View } from "react-native";
import { styles } from "./InvestmentsScreen.styles";

markStart("InvestmentsScreen.direct");
const InvestmentsScreen: React.FC = () => {
  useEffect(() => {
    markEnd("InvestmentsScreen.direct");
  }, []);
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <InvestmentSummaryCard />
      </View>
    </ScreenWrapper>
  );
};

export default InvestmentsScreen;
