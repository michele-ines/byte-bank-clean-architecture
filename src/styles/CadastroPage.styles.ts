import type { CadastroPageStyles } from "@/domain/interfaces/auth.interfaces";
import { colors, layout, typography } from "@presentation/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create<CadastroPageStyles>({
  container: { 
    flex: layout.flex1, 
    padding: typography.padding, 
    backgroundColor: colors.byteBgDefault,
  },
});
