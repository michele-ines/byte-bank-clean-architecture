import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type Styles = {
  headerContainer: ViewStyle;
  title: TextStyle;
  iconsContainer: ViewStyle;
  iconButton: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  headerContainer: {
    flexDirection: tokens.flexRow,
    justifyContent: tokens.justifyBetween,
    alignItems: tokens.alignCenter,
    marginBottom: tokens.spacingMd,
  },
  title: {
    fontSize: tokens.textXl,
    fontWeight: tokens.fontBold,
    color: tokens.byteGray800,
  },
  iconsContainer: {
    flexDirection: tokens.flexRow,
    gap: tokens.spacingMd,
  },
  iconButton: {
    width: tokens.width36,
    height: tokens.height36,
    borderRadius: tokens.radiusLg,
    backgroundColor: tokens.byteColorDash,
    justifyContent: tokens.justifyCenter,
    alignItems: tokens.alignCenter,
  },
});