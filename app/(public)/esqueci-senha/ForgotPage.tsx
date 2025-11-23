import { ForgotPasswordForm } from "@presentation/screens/Auth/ForgotPassword/ForgotPasswordForm";
import { markEnd, markStart } from "@shared/utils/performance";
import React, { useEffect } from "react";
import { View } from "react-native";
import { styles } from "src/styles/ForgotPage.styles";

markStart("ForgotPage");

const ForgotPage: React.FC = () => {
  useEffect(() => {
    markEnd("ForgotPage");
  }, []);
  return (
    <View style={styles.container}>
      <ForgotPasswordForm />
    </View>
  );
};

export default ForgotPage;
