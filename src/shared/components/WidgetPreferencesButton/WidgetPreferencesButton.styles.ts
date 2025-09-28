import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import { radius } from "@/src/theme/radius";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";
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
