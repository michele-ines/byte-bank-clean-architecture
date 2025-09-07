import { tokens } from "@/src/theme/tokens";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: tokens.spacingMd,
    borderRadius: tokens.radiusMd,
    backgroundColor: tokens.byteColorWhite,
    marginVertical: tokens.spacingSm,
    borderWidth: tokens.borderWidthThin,
    borderColor: tokens.byteColorDash,
  },
  title: { fontWeight: tokens.fontSemibold, fontSize: tokens.textBase, marginBottom: tokens.spacingXs },
  status: { marginTop: tokens.spacingXs, fontSize: tokens.textSm },
  progressBar: { backgroundColor: tokens.byteColorGreen500 },
});
