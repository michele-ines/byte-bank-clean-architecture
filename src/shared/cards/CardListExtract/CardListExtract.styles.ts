import { border, colors, layout, radius, shadows, spacing, typography } from "@presentation/theme";
import { StyleSheet } from "react-native";
import { TransactionsStyles } from "../../ProfileStyles/profile.styles.types";

export const styles = StyleSheet.create<TransactionsStyles>({
  container: {
    flex: layout.one,
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
  input: {
    borderWidth: border.widthThin,
    borderColor: colors.byteGray350,
    borderRadius: spacing.xs,
    padding: spacing.sm,
    fontSize: typography.textBase,
    color: colors.byteColorDash,
  },
  card: {
    shadowColor: colors.byteColorBlack,
    shadowRadius: spacing.xs2,
    paddingVertical: spacing.sm, 
    borderBottomWidth: border.widthThin,
    borderBottomColor: colors.byteColorGreen500,
  },
  row: {
    flexDirection: layout.flexRow,
    justifyContent: typography.justifyBetween,
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
   amountNegative: {
    color: colors.byteColorRed500,
  },
  date: {
    fontSize: typography.textXs,
    color: colors.byteGray450,
  },
  empty: {
    fontSize: typography.textSm,
    color: colors.byteGray350,
    textAlign: typography.alignCenter,
    marginTop: spacing.ml,
  },
  receiptButton: {
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
  attachmentsContainer: {
    marginTop: 10, 
  },
  attachmentsTitle: {
    fontWeight: typography.fontBold,
    color:colors.byteGray500,
    marginBottom: spacing.xs,
  },
  attachmentLink: {
    color: colors.byteColorBlue500,
    textDecorationLine: typography.textDecorationUnderline,
  },
  editActionsContainer: {
    marginTop: spacing.sm,
    alignItems:  typography.alignCenter,
  },
  attachmentRow: {
    flexDirection: layout.row,
    alignItems: typography.alignCenter,
    justifyContent:typography.justifyBetween,
    marginBottom: spacing.xs, 
  },
  deleteButton: {
    marginLeft: spacing.sm2,
    paddingHorizontal: spacing.xs,
    paddingVertical:spacing.xs2,
    borderRadius: radius.lg,
  },
  deleteButtonText: {
    color: colors.byteColorRed500,
    fontWeight: typography.fontBold,
    fontSize: typography.textMd,
  },

   separator: {
    height: layout.height2,
    width: layout.widthFull, 
    backgroundColor: colors.byteGray300, 
    marginVertical: spacing.xs, 
  },
});