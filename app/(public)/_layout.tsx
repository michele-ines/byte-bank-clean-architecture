import { colors, layout } from "@presentation/theme";
import { Slot } from "expo-router";
import type { JSX } from "react";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PublicLayout(): JSX.Element {
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
