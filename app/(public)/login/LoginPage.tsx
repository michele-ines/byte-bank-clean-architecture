import { LoginForm } from "@/src/features/auth/LoginForm/LoginForm";
import { styles } from "@/src/OtherServices/OtherServicesScreen.styles";
import React from "react";
import { View } from "react-native";

const LoginPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
};

export default LoginPage;
