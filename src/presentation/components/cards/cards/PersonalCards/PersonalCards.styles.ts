
import { border, colors, layout, radius, shadows, sizes, spacing, typography } from "@presentation/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    width: layout.widthFull,
    padding: spacing.lg,
    backgroundColor: colors.byteBgDashboard,
    borderRadius: radius.md,
  },
  title: {
    fontSize: typography.textMd,
    fontWeight: typography.fontBold,
    color: colors.byteColorBlack,
    textAlign: typography.textAlignCenter,
    marginBottom: spacing.sm,
  },

  list: {
    flexDirection: layout.flexColumn,
    gap: spacing.sm,
    width: layout.widthFull,
  },

  sectionHeading: {
    textAlign: typography.textAlignCenter,
    color: colors.byteTextMediumGray,
    marginBottom: spacing.xs2,
  },

  panel: {
    width: layout.widthFull,
    backgroundColor: colors.byteGray100,
    borderWidth: border.widthThin,
    borderColor: colors.byteGray300,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: typography.alignCenter,
    gap: spacing.md,
    shadowColor: colors.shadowColor,
    shadowOpacity: shadows.opacity,
    shadowOffset: shadows.offset,
    shadowRadius: shadows.radius,
    elevation: shadows.elevation,
  },

  row: {
    flexDirection: layout.flexRow,
    justifyContent: typography.alignFlexStart,
  },

  column: { flexDirection: layout.flexColumn },

  cardCol: { gap: spacing.xs, alignItems: typography.alignCenter },

  cardImageSmall: {
    maxWidth: sizes.cardImageSmallWidth,
    maxHeight: sizes.cardImageSmallHeight,
    alignSelf: typography.alignCenter,
  },

  actions: {
    flex: layout.one,
    alignItems: typography.alignCenter,
    gap: spacing.sm,
    width: layout.widthFull,
  },

  btn: {
    width: layout.widthFull,
    maxWidth: sizes.buttonMaxWidth,
    height: sizes.buttonHeight,
    borderRadius: radius.sm,
    alignItems: typography.alignCenter,
    justifyContent: typography.alignCenter,
  },

  pressed: { opacity: layout.opacityPressed },

  disabled: { opacity: layout.opacityMd },

  btnTextBase: {
    fontWeight: typography.fontBold,
    fontSize: typography.textBase,
  },

  btnPrimary: { backgroundColor: colors.byteColorOrange500 },

  btnPrimaryText: { color: colors.byteColorWhite },

  btnOutlinedDanger: {
    backgroundColor: colors.colorTransparent,
    borderWidth: border.widthThick,
    borderColor: colors.byteColorRed500,
  },

  btnOutlinedDangerText: { color: colors.byteColorRed500 },

  btnOutlinedNeutral: {
    backgroundColor: colors.colorTransparent,
    borderWidth: border.widthThick,
    borderColor: colors.byteGray400,
  },

  btnOutlinedNeutralText: { color: colors.byteGray800 },

  functionText: {
    color: colors.byteTextMediumGray,
    fontSize: typography.textSm,
    textAlign: typography.textAlignCenter,
  },

  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs2,
    borderRadius: radius.xl,
    alignSelf: typography.alignCenter,
  },

  badgeActive: {
    backgroundColor: colors.badgeActiveBg,
    borderWidth: border.widthThin,
    borderColor: colors.badgeActiveBorder,
  },

  badgeBlocked: {
    backgroundColor: colors.badgeBlockedBg,
    borderWidth: border.widthThin,
    borderColor: colors.byteColorRed500,
  },

  badgeText: { fontSize: typography.textXs, fontWeight: typography.fontBold },

  badgeTextActive: { color: colors.badgeActiveText },

  badgeTextBlocked: { color: colors.byteColorRed500 },
});
