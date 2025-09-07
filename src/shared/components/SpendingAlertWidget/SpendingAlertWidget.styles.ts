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
  alert: { color: tokens.byteColorError, fontWeight: tokens.fontBold, marginTop: tokens.spacing2Xs },
  ok: { color: tokens.byteColorGreen500, marginTop: tokens.spacing2Xs },
});
