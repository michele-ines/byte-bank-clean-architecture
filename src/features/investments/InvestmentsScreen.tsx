import { ScreenWrapper } from "@/src/components/common/ScreenWrapper/ScreenWrapper";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./InvestmentsScreen.styles";

const InvestmentsScreen: React.FC = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text>Investimentos</Text>
      </View>
    </ScreenWrapper>

  );
};

export default InvestmentsScreen;
