import { typography } from "@presentation/theme";
import type { ChartStyles } from "@shared/ProfileStyles/profile.styles.types";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create<ChartStyles>({
  chartContainer: {
    alignItems: typography.alignCenter,
    justifyContent: typography.justifyCenter,
  },
});
