import { colors, layout, spacing, typography } from "@presentation/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: layout.one,
    backgroundColor: colors.byteBgDefault,
    padding: spacing.lg,
    marginTop: spacing.md,
  },
  contentContainer: {
    paddingBottom: spacing.contentPaddingBottom, 
  },
  headerWrapper: {
    gap: spacing.xs,
  },
  title: {
    fontSize: typography.textXl,
    fontWeight: typography.fontBold,
    color: colors.byteColorBlack,
    textAlign: typography.textAlignCenter,
  },
  subtitle: {
    fontSize: typography.textSm,
    color: colors.byteTextMediumGray,
    textAlign: typography.textAlignCenter,
    marginBottom: spacing.md,
  },
});
