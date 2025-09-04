import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type ToastStyles = {
  baseToast: ViewStyle;
  errorToast: ViewStyle;
  successToast: ViewStyle;
  text1: TextStyle;
  text2: TextStyle;
};

export const toastStyles = StyleSheet.create<ToastStyles>({
  baseToast: {
    borderLeftWidth: tokens.borderLeft0,
    borderRadius:tokens.radiusSm,
    width: '90%',
    height:tokens.height80,
    padding:tokens.spacingMd,
  },
  errorToast: {
    backgroundColor: tokens.byteColorError,
  },
  successToast: {
    backgroundColor: tokens.byteColorGreen500,
  },
  text1: {
    fontSize: tokens.textBase,
    fontWeight: tokens.fontBold,
    color: tokens.gradientTealTo, 
  },
  text2: {
    fontSize: 14,
    color: tokens.gradientTealTo, 
  },
});
