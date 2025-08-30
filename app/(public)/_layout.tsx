import { Slot } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // 👈 use o da lib
import { tokens } from "../../src/theme/tokens";

export default function PublicLayout() {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <Slot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: tokens.byteBgDefault, 
  },
});
