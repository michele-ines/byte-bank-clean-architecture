import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type Styles = {
  container: ViewStyle;
  card: ViewStyle;
  row: ViewStyle;
  description: TextStyle;
  amount: TextStyle;
  date: TextStyle;
  empty: TextStyle;
  receiptButton: ViewStyle;
  receiptButtonText: TextStyle;
  input: TextStyle;
};

export const styles = StyleSheet.create<Styles>({
  container: {
    flex: tokens.flex1,
    gap: tokens.spacingXs,
    backgroundColor: tokens.byteColorWhite,
    borderRadius: tokens.radiusMd,
    padding: tokens.spacingMd,
  },
  input: {
    borderColor: tokens.byteColorDash,
    borderWidth: tokens.borderWidthThin,   
    borderRadius: tokens.spacing2Xs,      
    paddingHorizontal: tokens.spacingXs,  
    paddingVertical: tokens.spacing2Xs,   
    textAlign: tokens.textAlignRight,     
    minWidth: tokens.logoWidth,           
  },
  card: {
    paddingVertical: tokens.spacingSm,
    borderBottomWidth: tokens.borderWidthThin,
    borderBottomColor: tokens.byteGray200,
    marginBottom: tokens.spacingSm,
  },
  row: {
    flexDirection: tokens.flexRow,
    justifyContent: tokens.justifyBetween,
    marginBottom: tokens.spacing2Xs,
  },
  description: {
    fontSize: tokens.textBase,
    fontWeight: tokens.fontMedium,
    color: tokens.byteColorDash,
    textTransform:tokens.textTransformCapitalize,
  },
  amount: {
    fontSize: tokens.textBase,
    fontWeight: tokens.fontBold,
    color: tokens.byteColorGreen500,
  },
  date: {
    fontSize: tokens.textXs,
    color: tokens.byteGray500,
    marginBottom: tokens.spacingSm,
  },
  empty: {
    fontSize: tokens.textSm,
    color: tokens.byteGray400,
    textAlign: tokens.textAlignCenter,
    marginTop: tokens.spacingMl,
  },
  receiptButton: {
    marginTop: tokens.spacingXs,
    paddingVertical: tokens.spacing2Xs,
    paddingHorizontal: tokens.spacingSm,
    backgroundColor: tokens.byteColorGreen500,
    borderRadius: tokens.radiusSm,
    alignSelf: tokens.alignFlexStart,
  },
  receiptButtonText: {
    color: tokens.byteColorWhite,
    fontWeight: tokens.fontSemibold, 
    fontSize: tokens.textSm,
  },
});