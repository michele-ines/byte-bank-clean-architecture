import { styles } from "@/shared/styles/CadastroPage.styles";
import { SignupForm } from "@presentation/screens/Auth/Signup/SignupForm";
import { markEnd, markStart } from "@shared/utils/performance";
import React, { useEffect } from "react";
import { View } from "react-native";

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
