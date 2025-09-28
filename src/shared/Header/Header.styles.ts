import { layout, spacing, typography } from "@/src/theme";
import { Platform, StyleSheet } from "react-native";
import { HeaderStyles } from "../ProfileStyles/profile.styles.types";

export const styles = StyleSheet.create<HeaderStyles>({
  container: {
    width: layout. widthFull,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    paddingTop: Platform.OS === "android" ? spacing.xl : spacing.lg,
  },
  row: {
    flexDirection: layout.row,
    alignItems: typography.alignCenter,
    gap: spacing.sm,
  },
  centerLogo: {
    alignSelf: typography.alignCenter,
  },
});
