import { LoginForm } from "@/src/features/auth/LoginForm/LoginForm";
import { tokens } from "@/src/theme/tokens";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.byteBgDefault },
});
