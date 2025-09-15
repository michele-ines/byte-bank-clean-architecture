import { tokens } from "@/src/theme/tokens";
import { StyleSheet, ViewStyle } from "react-native";

type styles = {
  chartContainer: ViewStyle;
};

export const styles = StyleSheet.create<styles>({
  chartContainer: {
    alignItems: tokens.alignCenter,
    justifyContent: tokens.justifyCenter,
  },
});
