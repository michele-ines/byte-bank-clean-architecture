import { colors, layout, spacing, typography } from "@presentation/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: layout.one,
    backgroundColor: colors.byteBgDefault,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  content: { padding: spacing.md },
  title: {
    fontSize: typography.textLg,
    fontWeight: typography.fontBold,
    marginBottom: spacing.md,
  },
  widgetButton: {
    marginTop: spacing.md, 
  },
});
