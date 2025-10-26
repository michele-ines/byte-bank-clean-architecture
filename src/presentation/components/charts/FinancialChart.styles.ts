
import { colors, radius, spacing, typography } from "@presentation/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.lg,
    alignItems: typography.alignCenter,
  },
  title: {
    fontSize: typography.textLg,
    fontWeight: typography.fontSemibold,
    marginBottom: spacing.sm,
    color: colors.byteGray800,
  },
  chart: {
    borderRadius: radius.md,
  },
});
