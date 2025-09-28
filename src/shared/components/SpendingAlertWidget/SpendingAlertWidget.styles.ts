import { border } from "@/src/theme/border";
import { colors } from "@/src/theme/colors";
import { radius } from "@/src/theme/radius";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";
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
  alert: {
    color: colors.byteColorError,
    fontWeight: typography.fontBold,
    marginTop: spacing.xs2,
  },
  ok: { color: colors.byteColorGreen500, marginTop: spacing.xs2 },
});
