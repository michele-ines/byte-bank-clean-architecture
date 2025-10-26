import { border, colors, layout, radius, spacing, typography } from "@presentation/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: layout.one,
    backgroundColor: colors.byteOverlay,
    justifyContent: typography.alignCenter,
    alignItems: typography.alignCenter,
  },
  modal: {
    width: layout.width90Percent,
    maxHeight: layout.heightModalMax,
    backgroundColor: colors.byteColorWhite,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  title: {
    fontSize: typography.textLg,
    fontWeight: typography.fontBold,
    marginBottom: spacing.xs2,
  },
  description: {
    fontSize: typography.textSm,
    color: colors.byteTextMediumGray,
    marginBottom: spacing.md,
  },
  card: {
    borderWidth: border.widthThin,
    borderColor: colors.byteGray300,
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  cardSelected: {
    borderColor: colors.byteColorDash,
    backgroundColor: colors.byteGray50,
  },
  cardHeader: {
    flexDirection: layout.flexRow,
    justifyContent: typography.justifyBetween,
    alignItems: typography.alignCenter,
    marginBottom: spacing.xs2,
  },
  cardTitle: {
    fontWeight: typography.fontSemibold,
    fontSize: typography.textBase,
  },
  cardText: {
    fontSize: typography.textSm,
    color: colors.byteGray600,
    marginBottom: spacing.sm,
  },
  previewBox: {
    borderWidth: border.widthThin,
    borderColor: colors.byteGray200,
    borderRadius: radius.sm,
    padding: spacing.xs,
    backgroundColor: colors.byteColorWhite,
  },
  previewHeader: {
    flexDirection: layout.flexRow,
    alignItems: typography.alignCenter,
    marginBottom: spacing.xs2,
  },
  previewTitle: {
    fontWeight: typography.fontSemibold,
    fontSize: typography.textSm,
  },
  previewText: {
    fontSize: typography.textXs,
    color: colors.byteGray600,
    marginBottom: spacing.xs,
  },
  previewFooter: {
    flexDirection: layout.flexRow,
    justifyContent: typography.justifyBetween,
  },
  previewFooterText: {
    fontSize: typography.textSm,
    color: colors.byteGray600,
  },
  bold: {
    fontWeight: typography.fontBold,
    color: colors.byteColorBlack,
  },
  dangerText: {
    color: colors.byteColorError,
    fontWeight: typography.fontMedium,
  },
  successText: {
    color: colors.byteColorGreen500,
    fontWeight: typography.fontMedium,
  },
  icon: { color: colors.byteGray700 },
  actions: {
    flexDirection: layout.flexRow,
    justifyContent: typography.justifyEnd,
    marginTop: spacing.sm,
  },
  cancelButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.byteGray300,
    marginRight: spacing.xs,
  },
  cancelText: {
    color: colors.byteGray700,
    fontWeight: typography.fontSemibold,
  },
  confirmButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.byteColorDash,
  },
  confirmText: {
    color: colors.byteColorWhite,
    fontWeight: typography.fontSemibold,
  },
});
