import { ScreenWrapper } from "@/src/components/common/ScreenWrapper/ScreenWrapper";
import { NewTransactionForm } from "@/src/components/forms/NewTransactionForm/NewTransactionForm";
import React from "react";
import { View } from "react-native";
import { styles } from "./DashboardScreen.styles";
const DashboardScreen: React.FC = () => {
  return (
    <ScreenWrapper>
      <View style={styles.wrapper}>
        <NewTransactionForm />
      </View>
    </ScreenWrapper>

  );
};

export default DashboardScreen;
