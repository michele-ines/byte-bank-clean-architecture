import { layout } from "@/src/theme";
import { colors } from "@/src/theme/colors";
import { Slot } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PublicLayout() {
  return (
    <SafeAreaView style={styles.safe} edges={layout.safeEdges}>
      <Slot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: layout.flex1,
    backgroundColor: colors.byteBgDefault,
  },
});
