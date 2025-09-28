import { border } from "@/src/theme/border";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import { shadows } from "@/src/theme/shadows";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";
import { StyleSheet } from "react-native";
import { TransactionsStyles } from "../../ProfileStyles/profile.styles.types";

export const styles = StyleSheet.create<TransactionsStyles>({
  container: {
    flex: layout.one,
    gap: spacing.xs,
    backgroundColor: colors.byteColorWhite,
    borderRadius: spacing.sm2,
    padding: typography.textMd,
    paddingRight: layout.height50,
  },
  title: {
    fontSize: typography.textXl,
    fontWeight: typography.fontBold,
    marginBottom: spacing.xs,
  },
  card: {
    shadowColor: colors.byteColorBlack,
    shadowRadius: spacing.xs2,
    gap: shadows.radius,
    borderBottomWidth: border.widthThin,
    borderBottomColor: colors.byteColorGreen500,
    marginBottom: spacing.xs2,
  },
  row: {
    flexDirection: layout.flexRow,
    justifyContent: typography.justifyBetween,
    marginBottom: spacing.xs2,
  },
  description: {
    fontSize: typography.textBase,
    fontWeight: typography.fontMedium,
    color: colors.byteColorDash,
  },
  amount: {
    fontSize: typography.textBase,
    fontWeight: typography.fontBold,
    color: colors.byteColorGreen500,
  },
  date: {
    fontSize: typography.textXs,
    color: colors.byteGray450,
    marginBottom: spacing.sm2,
  },
  empty: {
    fontSize: typography.textSm,
    color: colors.byteGray350,
    textAlign: typography.alignCenter,
    marginTop: spacing.ml,
  },
  receiptButton: {
    marginTop: spacing.xs,
    paddingVertical: shadows.radius,
    paddingHorizontal: spacing.sm2,
    backgroundColor: colors.byteColorGreen500,
    borderRadius: spacing.xs,
    alignSelf: typography.alignFlexStart,
  },
  receiptButtonText: {
    color: colors.byteColorWhite,
    fontWeight: typography.fontSemibold,
    fontSize: typography.textSm,
  },
  loadingFooter: {
    paddingVertical: spacing.ml,
    alignItems: typography.alignCenter,
    justifyContent: typography.alignCenter,
  },
  loadingText: {
    fontSize: typography.textSm,
    color: colors.byteColorGreen500,
    fontWeight: typography.fontMedium,
  },
});
