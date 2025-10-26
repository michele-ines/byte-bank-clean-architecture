import { ForgotPasswordForm } from "@presentation/screens/Auth/ForgotPassword/ForgotPasswordForm";
import React from "react";
import { View } from "react-native";
import { styles } from "src/styles/ForgotPage.styles";


const ForgotPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <ForgotPasswordForm />
    </View>
  );
};

export default ForgotPage;
