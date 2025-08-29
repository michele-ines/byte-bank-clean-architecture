import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

// Tipagem exata para cada chave
type ServicesScreenStyles = {
  container: ViewStyle;
  title: TextStyle;
};

// StyleSheet tipado corretamente
export const styles = StyleSheet.create<ServicesScreenStyles>({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: tokens.byteBgDashboard,
  },
  title: {
    fontSize: tokens.textMd,
    fontWeight: tokens.fontBold as TextStyle["fontWeight"],
    color: tokens.byteColorDash,
  },
});
