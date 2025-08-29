import React from "react";
import { StyleSheet, View } from "react-native";
import { tokens } from "../../theme/tokens";
import { LoginForm } from "../auth/LoginForm/LoginForm";

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: tokens.byteBgDefault 
  },
});

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
};

export default HomeScreen;
