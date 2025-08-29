import React from "react";
import { Text, View } from "react-native";
import { styles } from "./CardsScreen.styles";

const CardsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus cartões</Text>
      <Text>Configure e bloqueie seus cartões por aqui.</Text>
    </View>
  );
};

export default CardsScreen;
