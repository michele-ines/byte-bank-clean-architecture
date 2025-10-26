import { colors, spacing, typography } from "@presentation/theme";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type Styles = {
  loadingFooter: ViewStyle;
  loadingText: TextStyle;
};

export const styles = StyleSheet.create<Styles>({
  loadingFooter: {
    paddingVertical: spacing.ml,
    alignItems: typography.alignCenter,
    justifyContent: typography.justifyBetween,
  },
  loadingText: {
    fontSize: typography.textSm,
    color: colors.byteColorGreen500,
    fontWeight: typography.fontMedium,
  },
});