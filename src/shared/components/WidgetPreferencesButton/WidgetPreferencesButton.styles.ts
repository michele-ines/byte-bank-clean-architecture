import { tokens } from "@/src/theme/tokens";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    flexDirection: tokens.flexRow,
    alignItems: tokens.alignCenter,
    gap: tokens.spacingXs,
    backgroundColor: tokens.byteColorDash,
    paddingVertical: tokens.spacingSm,
    paddingHorizontal: tokens.spacingMd,
    borderRadius: tokens.radiusSm,
  },
  buttonText: { color: tokens.byteColorWhite, fontWeight: tokens.fontSemibold },
  icon: { color: tokens.byteColorWhite },
});
