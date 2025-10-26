import { colors, layout, typography } from "@presentation/theme";
import { StyleSheet, ViewStyle } from "react-native";

type CadastroPageStyles = {
  container: ViewStyle;
};

export const styles = StyleSheet.create<CadastroPageStyles>({
  container: { 
    flex: layout.flex1, 
    padding: typography.padding, 
    backgroundColor: colors.byteBgDefault,
  },
});
