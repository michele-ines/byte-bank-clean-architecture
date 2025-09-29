import { ChartStyles } from "@/src/shared/ProfileStyles/profile.styles.types";
import { typography } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create<ChartStyles>({
  chartContainer: {
    alignItems: typography.alignCenter,
    justifyContent: typography.justifyCenter,
  },
});
