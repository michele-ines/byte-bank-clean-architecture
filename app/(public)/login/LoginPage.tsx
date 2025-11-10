import { LoginForm } from "@presentation/screens/Auth/Login/LoginForm";
import { styles } from "@presentation/screens/OtherServices/OtherServicesScreen.styles";
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
