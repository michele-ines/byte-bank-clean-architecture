import { colors, layout } from "@presentation/theme";
import { StyleSheet } from "react-native";
import type { ForgotPageStyles } from "../shared/ProfileStyles/profile.styles.types";

export const styles = StyleSheet.create<ForgotPageStyles>({
  container: { 
    flex: layout.flex1, 
    backgroundColor: colors.byteBgDefault,
  },
});
