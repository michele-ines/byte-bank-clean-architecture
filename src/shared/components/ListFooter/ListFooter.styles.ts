import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type Styles = {
  loadingFooter: ViewStyle;
  loadingText: TextStyle;
};

export const styles = StyleSheet.create<Styles>({
  loadingFooter: {
    paddingVertical: tokens.spacingMl,
    alignItems: tokens.alignCenter,
    justifyContent: tokens.justifyBetween,
  },
  loadingText: {
    fontSize: tokens.textSm,
    color: tokens.byteColorGreen500,
    fontWeight: tokens.fontMedium,
  },
});