import { ForgotPasswordForm } from "@/src/features/auth/ForgotPasswordForm/ForgotPasswordForm";
import { styles } from "@/src/styles/ForgotPage.styles";
import React from "react";
import { View } from "react-native";

const ForgotPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <ForgotPasswordForm />
    </View>
  );
};

export default ForgotPage;
