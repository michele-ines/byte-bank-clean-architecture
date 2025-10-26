import { colors, layout, radius, spacing, typography } from "@presentation/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    flexDirection: layout.flexRow,
    alignItems: typography.alignCenter,
    gap: spacing.xs,
    backgroundColor: colors.byteColorDash,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
  },
  buttonText: {
    color: colors.byteColorWhite,
    fontWeight: typography.fontSemibold,
  },
  icon: { color: colors.byteColorWhite },
});
