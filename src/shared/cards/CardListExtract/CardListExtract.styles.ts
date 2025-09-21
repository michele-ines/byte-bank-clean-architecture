import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type Styles = {
  container: ViewStyle;
  title: TextStyle;
  card: ViewStyle;
  row: ViewStyle;
  description: TextStyle;
  amount: TextStyle;
  date: TextStyle;
  empty: TextStyle;
  receiptButton: ViewStyle;
  receiptButtonText: TextStyle;
  loadingFooter: ViewStyle;
  loadingText: TextStyle;
};

export const styles = StyleSheet.create<Styles>({
  container: { 
    flex: tokens.flex1, 
    gap: tokens.spacingXs, 
    backgroundColor: 
    tokens.byteColorWhite, 
    borderRadius: tokens.spacing2Sm,
    padding: tokens.textMd,
    paddingRight: tokens.height50
  },
  title: { fontSize: tokens.textXl, fontWeight: tokens.fontBold, marginBottom: tokens.spacingXs },
  card: {
    shadowColor: tokens.byteColorBlack,
    shadowRadius: tokens.spacing2Xs,
    gap: tokens.shadowRadius,
    borderBottomWidth: tokens.borderWidthThin,
    borderBottomColor: tokens.byteColorGreen500,
    marginBottom: tokens.textXs

  },
  row: { flexDirection: tokens.flexRow, justifyContent: tokens.justifyBetween, marginBottom: tokens.spacing2Xs },
  description: { fontSize: tokens.textBase, fontWeight: tokens.fontMedium, color: tokens.byteColorDash },
  amount: { fontSize: tokens.textBase, fontWeight: tokens.fontBold, color: tokens.byteColorGreen500 },
  date: { fontSize: tokens.textXs, color: tokens.byteGray450, marginBottom: tokens.spacing2Sm },
  empty: { fontSize: tokens.textSm, color: tokens.byteGray350, textAlign: tokens.alignCenter, marginTop: tokens.spacingMl },
  receiptButton: {
    marginTop: tokens.spacingXs,
    paddingVertical: tokens.shadowRadius,
    paddingHorizontal: tokens.spacing2Sm,
    backgroundColor: tokens.byteColorGreen500,
    borderRadius: tokens.spacingXs,
    alignSelf: tokens.alignFlexStart,
  },
  receiptButtonText: {
    color: tokens.byteColorWhite,
    fontWeight: tokens.fontSemibold,
    fontSize: tokens.textSm,
  },
  loadingFooter: {
    paddingVertical: tokens.spacingMl,
    alignItems: tokens.alignCenter,
    justifyContent: tokens.alignCenter,
  },
  loadingText: {
    fontSize: tokens.textSm,
    color: tokens.byteColorGreen500,
    fontWeight: tokens.fontMedium,
  },
});
