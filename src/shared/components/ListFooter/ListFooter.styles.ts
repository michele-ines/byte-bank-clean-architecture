import { colors, spacing, typography } from "@presentation/theme";
import type { TextStyle, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";

interface Styles {
  loadingFooter: ViewStyle;
  loadingText: TextStyle;
}

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