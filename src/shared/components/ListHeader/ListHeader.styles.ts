import { colors, layout, radius, spacing, typography } from "@/src/theme";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type Styles = {
  headerContainer: ViewStyle;
  title: TextStyle;
  iconsContainer: ViewStyle;
  iconButton: ViewStyle;
  iconButtonDelete: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  headerContainer: {
    flexDirection: layout.flexRow,
    justifyContent: typography.justifyBetween,
    alignItems: typography.alignCenter,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.textXl,
    fontWeight: typography.fontBold,
    color: colors.byteGray800,
  },
  iconsContainer: {
    flexDirection: layout.flexRow,
    gap: spacing.md,
  },
  iconButton: {
    width: layout.width36,
    height: layout.height36,
    borderRadius: radius.xl,
    backgroundColor: colors.byteColorDash,
    justifyContent: typography.justifyCenter,
    alignItems: typography.alignCenter,
  },
  iconButtonDelete: {
    width: layout.width36,
    height: layout.height36,
    borderRadius: radius.xl,
    backgroundColor: colors.byteColorRed500,
    justifyContent: typography.justifyCenter,
    alignItems: typography.alignCenter,
  },
});