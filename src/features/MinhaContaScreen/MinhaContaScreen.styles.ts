import { colors, layout, radius, spacing, typography } from "@/src/theme";
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
    flex: layout.flex1,
    backgroundColor: colors.byteBgDashboard,
    padding: spacing.md,
  },
  cardContainer: {
    flex: layout.flex1,
    backgroundColor: colors.byteGray,
    borderRadius: radius.lg,
    padding: spacing.md,
    maxHeight: layout.height100Percent,
  },
  IllustrationsContainer: {
    alignItems: typography.alignCenter,
    justifyContent: typography.justifyCenter,
    maxHeight: layout.heightModalMax,
    zIndex: layout.zIndex1,
    width: layout.widthFull,
    minHeight: layout.minHeight,
    marginLeft: spacing.md,
  },
  illustration: {
    maxWidth: layout.widthFull,
    maxHeight: layout.heightModalMax,
  },
  pixelTop: {
    position: layout.positionAbsolute,
    left: layout.width0,
  },
  pixelBottom: {
    position: layout.positionAbsolute,
    bottom: layout.width0,
    right: layout.width0,
  },
});
