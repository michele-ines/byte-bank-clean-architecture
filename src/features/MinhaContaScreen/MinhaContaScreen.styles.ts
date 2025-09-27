import { tokens } from "@/src/theme/tokens";
import { StyleSheet, ViewStyle } from "react-native";

type MinhaContaStyles = {
  wrapper: ViewStyle;
  cardContainer: ViewStyle;
  illustration: ViewStyle;
  pixelBottom: ViewStyle;
  pixelTop: ViewStyle;
  IllustrationsContainer: ViewStyle;
};

export const styles = StyleSheet.create<MinhaContaStyles>({
  wrapper: {
    flex: tokens.flex1,
    backgroundColor: tokens.byteBgDashboard,
    padding: tokens.spacingMd,
  },
  cardContainer: {
    flex: tokens.flex1,
    backgroundColor: tokens.byteGray,
    borderRadius: tokens.radiusLg,
    padding: tokens.spacingMd,
    maxHeight: tokens.height100Percent,
  },
  IllustrationsContainer: {
    alignItems: tokens.alignCenter,
    justifyContent: tokens.justifyCenter,
    maxHeight: tokens.heightModalMax,
    zIndex: tokens.zIndex1,
    width: tokens.widthFull,
    minHeight: tokens.minHeight,
    marginLeft: tokens.spacingMd,
  },
  illustration: {
    maxWidth: tokens.widthFull,
    maxHeight: tokens.heightModalMax,
  },
  pixelTop: {
    position: tokens.positionAbsolute,
    left: tokens.width0,
  },
  pixelBottom: {
    position: tokens.positionAbsolute,
    bottom: tokens.width0,
    right: tokens.width0,
  },
});
