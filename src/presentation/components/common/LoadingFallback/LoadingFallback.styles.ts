import { colors, layout, spacing, typography } from "@/presentation/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: layout.widthFull,
    height: layout.height100Percent,
    padding: spacing.lg,
    flexDirection: layout.flexRow,
    justifyContent: typography.justifyCenter,
    alignItems: typography.alignCenter,
    backgroundColor: colors.byteBgDefault,
  },
  loadingIcon: {
    color: colors.byteColorGreen500,
  },
  text: {
    marginTop: spacing.sm2,
  },
});
