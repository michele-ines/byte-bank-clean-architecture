import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

// Tipagem para os estilos partilhados
type SharedStyles = {
  keyboardView: ViewStyle;
  scrollView: ViewStyle;
  scrollViewContent: ViewStyle;
  formContainer: ViewStyle;
  title: TextStyle;
  label: TextStyle;
  input: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  buttonDisabled: ViewStyle;
};

export const sharedStyles = StyleSheet.create<SharedStyles>({
  // Layouts
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: tokens.byteBgDefault,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: tokens.spacingLg,
    gap: tokens.spacingSm,
  },
  // Elementos de Formulário
  title: {
    fontSize: tokens.textXl,
    fontWeight: tokens.fontBold,
    textAlign: 'center',
    color: tokens.byteGray800,
    marginBottom: tokens.spacingMd,
  },
  label: {
    fontSize: tokens.textBase,
    fontWeight: tokens.fontSemibold,
    color: tokens.byteGray700,
    marginBottom: tokens.spacing2Xs,
  },
  input: {
    borderWidth: 1,
    borderColor: tokens.byteGray300,
    borderRadius: tokens.radiusSm,
    paddingHorizontal: tokens.spacingSm,
    paddingVertical: tokens.spacingSm,
    fontSize: tokens.textBase,
    backgroundColor: tokens.byteGray50,
    color: tokens.byteGray800,
  },
  // Botões
  button: {
    paddingVertical: 14,
    borderRadius: tokens.radiusSm,
    alignItems: 'center',
    marginTop: tokens.spacingXs,
    width: 150,
  },
  buttonText: {
    color: tokens.byteColorWhite,
    fontWeight: tokens.fontBold,
    fontSize: tokens.textBase,
  },
  buttonDisabled: {
    backgroundColor: tokens.byteGray400,
  },
});
