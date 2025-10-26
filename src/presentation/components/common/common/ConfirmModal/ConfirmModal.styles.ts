import { border, colors, layout, radius, shadows, sizes, spacing, typography } from "@presentation/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.byteOverlay,
  },
  sheet: {
    position: layout.positionAbsolute,
    left: spacing.md,
    right: spacing.md,
    top: layout.modalTopPosition,
    borderRadius: radius.md,
    padding: spacing.md,
    backgroundColor: colors.byteBgDefault,
    shadowColor: colors.shadowColor,
    shadowOpacity: shadows.opacity,
    shadowOffset: shadows.offset,
    shadowRadius: shadows.radius,
    elevation: shadows.elevation,
  },
  title: {
    fontSize: typography.textLg,
    fontWeight: typography.fontBold,
    color: colors.byteColorBlack,
    marginBottom: spacing.xs2,
    textAlign: typography.textAlignCenter, 
  },
  msg: {
    fontSize: typography.textSm,
    color: colors.byteTextMediumGray,
    marginBottom: spacing.sm,
    textAlign: typography.textAlignCenter,
  },
  row: {
    flexDirection: layout.flexRow,
    justifyContent: typography.justifyCenter, 
    gap: spacing.sm,
  },
  btn: {
    minWidth: sizes.buttonMinWidth,
    maxWidth: sizes.buttonMaxWidth,
    height: sizes.buttonHeight,
    borderRadius: radius.sm,
    alignItems: typography.alignCenter,
    justifyContent: typography.alignCenter,
    paddingHorizontal: spacing.sm,
    flex: 1,
  },
  btnPrimary: { backgroundColor: colors.byteColorOrange500 },
  btnDanger: { backgroundColor: colors.byteColorRed500 },
  btnText: {
    color: colors.byteColorWhite,
    fontWeight: typography.fontBold,
  },
  btnGhost: {
    backgroundColor: colors.colorTransparent,
    borderWidth: border.widthThin,
    borderColor: colors.byteGray300,
  },
  btnGhostText: {
    color: colors.byteGray800,
    fontWeight: typography.fontBold,
  },
  pressed: { opacity: 0.8 },
  loadingBtn: { opacity: 0.7 },
});
