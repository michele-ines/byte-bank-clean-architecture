import { tokens } from "@/src/theme/tokens";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginVertical: tokens.spacingLg,
    alignItems: tokens.alignCenter,
  },
  title: {
    fontSize: tokens.textLg,
    fontWeight: tokens.fontSemibold,
    marginBottom: tokens.spacingSm,
    color: tokens.byteGray800,
  },
  chart: {
    borderRadius: tokens.radiusMd,
  },
});
