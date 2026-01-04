import { colors, layout } from "@/presentation/styles/theme";
import { StyleSheet } from "react-native";
import type { ForgotPageStyles } from "../ProfileStyles/profile.styles.types";

export const styles = StyleSheet.create<ForgotPageStyles>({
  container: { 
    flex: layout.flex1, 
    backgroundColor: colors.byteBgDefault,
  },
});
