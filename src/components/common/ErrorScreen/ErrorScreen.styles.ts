import { layout } from "@/src/theme";
import { colors } from "@/src/theme/colors";
import { radius } from "@/src/theme/radius";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.byteColorWhite,
  },
  container: {
    flex: layout.flex1,
    justifyContent: typography.justifyCenter, 
    alignItems: typography.alignCenter,
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.textXl,
    fontWeight: typography.fontBold,
    color: colors.byteColorDash,
    marginBottom: spacing.sm,
  },
  message: {
    fontSize: typography.textBase,
    color: colors.byteGray600,
    textAlign: typography.textAlignCenter,
    marginBottom: spacing.lg,
  },
  retryButton: {
    backgroundColor: colors.byteColorDash,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.sm,
  },
  retryButtonText: {
    color: colors.byteColorWhite,
    fontSize: typography.textBase,
    fontWeight: typography.fontBold,
  },
});
