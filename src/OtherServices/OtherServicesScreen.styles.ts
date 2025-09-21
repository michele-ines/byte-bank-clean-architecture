import { tokens } from "@/src/theme/tokens";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: tokens.flex1, backgroundColor: tokens.byteBgDefault, padding: tokens.spacingMd, marginTop: tokens.spacingMd },
  content: { padding: tokens.spacingMd },
  title: { fontSize: tokens.textLg, fontWeight: tokens.fontBold, marginBottom: tokens.spacingMd },
});
