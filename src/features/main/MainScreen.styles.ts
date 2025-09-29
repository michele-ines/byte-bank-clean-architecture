import { layout } from "@/src/theme";
import { colors } from "@/src/theme/colors";
import { radius } from "@/src/theme/radius";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: layout.flex1,
  },
  gradientBg: {
    flex: layout.flex1,
  },
  innerContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  hero: {
    alignItems: typography.alignCenter,
    marginBottom: spacing.xl,
  },
  heroTitle: {
    fontSize: typography.textLg,
    fontWeight: typography.fontBold,
    textAlign: typography.textAlignCenter,
    marginTop: spacing.ml,
    marginBottom: spacing.xs,
    color: colors.byteColorBlack,
  },
  heroSubtitle: {
    fontSize: typography.textMd,
    fontWeight: typography.fontBold,
    textAlign: typography.textAlignCenter,
    marginBottom: spacing.md,
    color: colors.byteColorGreen500,
  },
  buttonsRow: {
    flexDirection: layout.row,
    justifyContent: typography.textAlignCenter,
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  btn: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: layout.borderWidth, 
  },
  btnPrimary: {
    backgroundColor: colors.byteColorBlack,
    borderColor: colors.byteColorBlack,
  },
  btnPrimaryText: {
    color: colors.byteColorWhite,
    fontWeight: typography.fontBold,
    textAlign: typography.textAlignCenter,
  },
  btnSecondary: {
    backgroundColor: colors.colorTransparent, 
    borderColor: colors.byteColorBlack,
  },
  btnSecondaryText: {
    color: colors.byteColorBlack,
    fontWeight: typography.fontBold,
    textAlign: typography.textAlignCenter,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.textMd,
    fontWeight: typography.fontBold,
    textAlign: typography.textAlignCenter,
    marginBottom: spacing.lg,
    color: colors.byteColorBlack,
  },
  card: {
    alignItems: typography.alignCenter,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  cardTitle: {
    fontSize: typography.textLg,
    fontWeight: typography.fontSemibold,
    textAlign: typography.textAlignCenter,
    marginTop: spacing.xs,
    marginBottom: spacing.xs2,
    color: colors.byteColorGreen500,
  },
  cardDescription: {
    fontSize: typography.textBase,
    textAlign: typography.textAlignCenter,
    color: colors.byteTextMediumGray,
    lineHeight: typography.lineHeightRelaxed,
  },
});
