import { CardListExtract } from "@/src/components/cards/CardListExtract/CardListExtract";
import { NewTransactionForm } from "@/src/components/forms/NewTransactionForm/NewTransactionForm";
import React from "react";
import { View } from "react-native";
import { styles } from "./DashboardScreen.styles";

const DashboardScreen: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <NewTransactionForm />
      <CardListExtract title="Extrato" />
    </View>
  );
};

export default DashboardScreen;
