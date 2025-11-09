import { SignupForm } from "@presentation/screens/Auth/Signup/SignupForm";
import { markEnd, markStart } from "@shared/utils/performance";
import React, { useEffect } from "react";
import { View } from "react-native";
import { styles } from "src/styles/CadastroPage.styles";

markStart("CadastroPage");

const CadastroPage: React.FC = () => {
  useEffect(() => {
    markEnd("CadastroPage");
  }, []);
  return (
    <View style={styles.container}>
      <SignupForm />
    </View>
  );
};

export default CadastroPage;
