import { SignupForm } from "@/src/features/auth/SignupForm/SignupForm";
import { styles } from "@/src/styles/CadastroPage.styles";
import React from "react";
import { View } from "react-native";

const CadastroPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <SignupForm />
    </View>
  );
};

export default CadastroPage;
