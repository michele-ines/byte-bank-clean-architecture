import { sharedStyles } from "@/src/styles/shared.styles";
import { tokens } from "@/src/theme/tokens";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
 
  keyboardView: {
    ...sharedStyles.keyboardView,
  },
  card: {
    ...sharedStyles.formContainer,
    backgroundColor: tokens.byteColorGreen100, 
  },
  illustration: {
    width: '100%',
    marginBottom: tokens.spacingMd,
  },
  title: {
    ...sharedStyles.title,
  },
  label: {
    ...sharedStyles.label,
  },
  input: {
    ...sharedStyles.input,
    backgroundColor: tokens.byteColorGreen100, 
  },
  button: {
    ...sharedStyles.button,
  },
  buttonText: {
    ...sharedStyles.buttonText,
  },
  submitButton: {
    backgroundColor: tokens.byteColorGreen500,
  },
  submitButtonDisabled: {
    ...sharedStyles.buttonDisabled,
  },
  createButton: {
    backgroundColor: tokens.byteColorOrange500,
  },
  alignButtons: {
    alignItems: 'center',
  },
  forgot: {
    color: tokens.byteColorGreen500,
    textAlign: "left",
    fontWeight: tokens.fontSemibold,
    marginTop: tokens.spacing2Xs,
    marginBottom: tokens.spacingMd,
    textDecorationLine: 'underline',
  },
});
