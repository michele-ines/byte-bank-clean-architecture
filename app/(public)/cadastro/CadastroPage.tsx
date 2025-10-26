import { SignupForm } from "@presentation/screens/Auth/Signup/SignupForm";
import React from "react";
import { View } from "react-native";
import { styles } from "src/styles/CadastroPage.styles";



const CadastroPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <SignupForm />
    </View>
  );
};

export default CadastroPage;
