
import { colors, layout, spacing, typography } from "@presentation/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: layout.widthFull,
    backgroundColor: colors.byteColorBlack,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    flexDirection: layout.flexColumn, 
    alignItems: typography.alignFlexStart,
    gap: spacing.xl,
    marginTop: spacing.lg,
  },
  section: {
    width: layout.widthFull,
    gap: spacing.xs2,
  },
  title: {
    color: colors.byteColorWhite,
    fontWeight: typography.fontBold,
    marginBottom: spacing.xs2,
    fontSize: typography.textSm,
    lineHeight: typography.lineHeightNormal,
    textAlign: typography.textAlignLeft,
  },
  link: {
    color: colors.byteColorWhite,
    fontSize: typography.textSm,
    lineHeight: typography.lineHeightNormal,
    textAlign: typography.textAlignLeft,
  },
  social: {
    flexDirection: layout.flexRow,
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
});
