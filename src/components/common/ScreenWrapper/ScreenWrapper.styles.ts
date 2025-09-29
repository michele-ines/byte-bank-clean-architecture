import { layout } from "@/src/theme";
import { colors } from "@/src/theme/colors";
import { spacing } from "@/src/theme/spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    flex: layout.flex1,
    padding: spacing.md,
    backgroundColor: colors.byteBgDashboard,
    gap: spacing.md,
  },
  header: {
    marginBottom: spacing.md,
  },
  footer: {
    marginTop: spacing.md,
  },
});
