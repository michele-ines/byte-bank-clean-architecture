import { tokens } from "@/src/theme/tokens";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: tokens.byteColorBlack,
    paddingVertical: tokens.spacingXl,
    paddingHorizontal: tokens.spacingLg,
    flexDirection: "column", // 🔑 sempre em coluna (mobile-first)
    alignItems: "flex-start",
    gap: tokens.spacingXl,
    marginTop: tokens.spacingLg,
  },
  section: {
    width: "100%",
    gap: tokens.spacing2Xs,
  },
  title: {
    color: tokens.byteColorWhite,
    fontWeight: tokens.fontBold,
    marginBottom: tokens.spacing2Xs,
    fontSize: tokens.textSm,
    lineHeight: tokens.lineHeightNormal,
    textAlign: "left",
  },
  link: {
    color: tokens.byteColorWhite,
    fontSize: tokens.textSm,
    lineHeight: tokens.lineHeightNormal,
    textAlign: "left",
  },
  social: {
    flexDirection: "row",
    gap: tokens.spacingSm,
    marginTop: tokens.spacingSm,
  },
});
