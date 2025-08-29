import { tokens } from "@/src/theme/tokens";
import { StyleSheet, ViewStyle } from "react-native";

type CadastroPageStyles = {
  container: ViewStyle;
};

export const styles = StyleSheet.create<CadastroPageStyles>({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: tokens.byteBgDefault,
  },
});
