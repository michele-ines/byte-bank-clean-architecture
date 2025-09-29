import { colors } from "@/src/theme/colors";
import { radius } from "@/src/theme/radius";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";
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
