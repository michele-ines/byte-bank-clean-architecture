import { StyleSheet, ViewStyle } from "react-native";
import { layout, typography } from "../theme";
import { colors } from "../theme/colors";

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
