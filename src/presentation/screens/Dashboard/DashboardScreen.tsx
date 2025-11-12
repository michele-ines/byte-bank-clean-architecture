import { ScreenWrapper } from "@presentation/components/common/common/ScreenWrapper/ScreenWrapper";
import { NewTransactionForm } from "@presentation/components/forms/NewTransactionForm/NewTransactionForm";
import { markEnd, markStart } from "@shared/utils/performance";
import React, { useEffect } from "react";
import { View } from "react-native";
import { styles } from "./DashboardScreen.styles";

markStart("DashboardScreen.direct");
const DashboardScreen: React.FC = () => {
  useEffect(() => {
    markEnd("DashboardScreen.direct");
  }, []);
  return (
    <ScreenWrapper>
      <View style={styles.wrapper}>
        <NewTransactionForm />
      </View>
    </ScreenWrapper>
  );
};

export default DashboardScreen;
