
import { ScreenWrapper } from "@presentation/components/common/common/ScreenWrapper/ScreenWrapper";
import { NewTransactionForm } from "@presentation/components/forms/NewTransactionForm/NewTransactionForm";
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
