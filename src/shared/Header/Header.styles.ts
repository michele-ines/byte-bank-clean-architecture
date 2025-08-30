import { Platform, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { tokens } from "../../theme/tokens";

type Styles = {
  container: ViewStyle;
  logo: TextStyle;
};

export const styles = StyleSheet.create<Styles>({
  container: {
    width: "100%",
    paddingHorizontal: tokens.spacingMd,
    paddingVertical: tokens.spacingMd,
    paddingTop: Platform.OS === "android" ? tokens.spacingXl : tokens.spacingLg,
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacingSm,
  },
  logo: {
    fontSize: tokens.textLg,
    fontWeight: tokens.fontBold,
    color: tokens.byteColorGreen500,
  },
});
