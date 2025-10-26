import { border, colors, radius, spacing, typography } from "@presentation/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.byteColorWhite,
    marginVertical: spacing.sm,
    borderWidth: border.widthThin,
    borderColor: colors.byteColorDash,
  },
  title: {
    fontWeight: typography.fontSemibold,
    fontSize: typography.textBase,
    marginBottom: spacing.xs,
  },
  status: { marginTop: spacing.xs, fontSize: typography.textSm },
  progressBar: { backgroundColor: colors.byteColorGreen500 },
});
