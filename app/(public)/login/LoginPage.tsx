import { LoginForm } from "@presentation/screens/Auth/Login/LoginForm";
import { styles } from "@presentation/screens/OtherServices/OtherServicesScreen.styles";
import { markEnd, markStart } from "@shared/utils/performance";
import React, { useEffect } from "react";
import { View } from "react-native";

markStart("LoginPage");

const LoginPage: React.FC = () => {
  useEffect(() => {
    markEnd("LoginPage");
  }, []);
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
};

export default LoginPage;
