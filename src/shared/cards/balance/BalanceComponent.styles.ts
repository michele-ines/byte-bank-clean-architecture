import { colors, layout, radius, spacing, typography } from "@presentation/theme";
import { StyleSheet } from "react-native";
import { BalanceComponentStyle } from "../../ProfileStyles/profile.styles.types";

export const styles = StyleSheet.create<BalanceComponentStyle>({
  container: {
    backgroundColor: colors.byteColorDash,
    borderRadius: radius.sm,
    paddingVertical: layout.paddingVertical,
    width: layout.widthFull,
    minHeight: layout.minHeight600,
    overflow: typography.overflow,
    flexDirection: typography.flexDirection,
    paddingHorizontal: layout.paddingHorizontal,
    gap: layout.gap,
  },
  greetingSection: {
    zIndex: layout.zIndex2,
  },
  nameTitle: {
    color: colors.byteBgDefault,
    fontFamily: typography.fontInter,
    fontWeight: typography.fontSemibold,
    fontSize: typography.textXl,
    textAlign: typography.textAlignCenter,
    marginBottom: spacing.lg,
  },
  dateText: {
    color: colors.byteBgDefault,
    fontFamily: typography.fontInter,
    fontSize: typography.textXl,
    opacity: layout.opacityLg,
    textAlign: typography.textAlignCenter,
  },
  balanceSection: {
    justifyContent: typography.alignCenter,
    alignItems: typography.alignFlexStart,
    zIndex: layout.zIndex2,
  },
  saldoHeader: {
marginBottom: spacing.md,
    width: layout.widthFull,
  },
  saldoTitleContainer: {
    flexDirection: layout.flexRow,
    alignItems: typography.alignCenter,
    marginBottom: spacing.xs,
  },
  saldoTitle: {
    color: colors.byteBgDefault,
    fontFamily: typography.fontInter,
    fontWeight: typography.fontSemibold,
    fontSize: typography.textMd,
  },
  eyeIconContainer: {
    marginLeft: spacing.sm,
    padding: spacing.xs,
  },
  contaCorrenteTitle: {
    color: colors.byteBgDefault,
    fontFamily: typography.fontInter,
    fontSize: typography.textSm,
    marginBottom: spacing.xs,
    opacity: layout.opacityLg,
  },
  valorSaldoText: {
    color: colors.byteBgDefault,
    fontFamily: typography.fontInter,
    fontSize: typography.fontSize,
    fontWeight: typography.fontSemibold,
    lineHeight: typography.lineHeight,
  },
  pixelsImage1: {
    position: layout.positionAbsolute,
    top: typography.top,
    left: typography.left,
    width: layout.width90Percent,
    height: layout.heightModalMax,
    opacity: layout.opacityImage,
  },
  pixelsImage2: {
    position: layout.positionAbsolute,
    bottom: typography.bottom,
    right: typography.right,
    width: layout.width45Percent,
    height: layout.height50Percent,
    opacity: layout.opacityImage,
  },
  whiteLine: {
    width: layout.widthFull,
    height: layout.height2,
    backgroundColor: colors.byteColorWhite,
  },
});
