import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { tokens } from "../../src/theme/tokens";

export default function PublicLayout() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Slot />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.byteBgDefault },
  content: { flex: 1 },
});