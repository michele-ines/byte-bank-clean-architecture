import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { layout } from "../theme/layout";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

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
