import { tokens } from "@/src/theme/tokens";
import { StyleSheet, ViewStyle } from "react-native";

type ForgotPageStyles = {
  container: ViewStyle;
};

export const styles = StyleSheet.create<ForgotPageStyles>({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: tokens.byteBgDefault,
  },
});
