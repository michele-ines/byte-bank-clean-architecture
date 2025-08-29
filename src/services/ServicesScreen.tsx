import React from "react";
import { Text, View } from "react-native";
import { styles } from "./ServicesScreen.styles";

const ServicesScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Outros serviços</Text>
      <Text>Em breve.</Text>
    </View>
  );
};

export default ServicesScreen;
