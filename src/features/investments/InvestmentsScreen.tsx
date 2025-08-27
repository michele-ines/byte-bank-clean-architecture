import { CardListExtract } from "@/src/components/cards/CardListExtract/CardListExtract";
import React from "react";
import { View } from "react-native";
import { styles } from "./InvestmentsScreen.styles";

const InvestmentsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <CardListExtract
        title="Investimentos"
        filterFn={(t) => t.description.toLowerCase().includes("investimento")}
      />
    </View>
  );
};

export default InvestmentsScreen;
