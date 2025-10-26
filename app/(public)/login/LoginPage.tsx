// import { LoginForm } from "@/src/features/auth/LoginForm/LoginForm";
// import { styles } from "@/src/OtherServices/OtherServicesScreen.styles";
import { LoginForm } from "@presentation/screens/Auth/Login/LoginForm";
import { styles } from "@presentation/screens/OtherServices/OtherServicesScreen.styles";
import React from "react";
import { View } from "react-native";
// import { styles } from "src/OtherServices/OtherServicesScreen.styles";

const LoginPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
};

export default LoginPage;
