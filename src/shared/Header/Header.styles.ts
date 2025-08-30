import { Platform, StyleSheet, ViewStyle } from "react-native";
import { tokens } from "../../theme/tokens";

type Styles = {
  container: ViewStyle;
  row: ViewStyle;
  centerLogo: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  container: {
    width: "100%",
    paddingHorizontal: tokens.spacingMd,
    paddingVertical: tokens.spacingMd,
    paddingTop: Platform.OS === "android" ? tokens.spacingXl : tokens.spacingLg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacingSm,
  },
  centerLogo: {
    alignSelf: "center",
  },
});
