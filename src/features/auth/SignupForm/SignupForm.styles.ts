import { sharedStyles } from "@/src/styles/shared.styles";
import { tokens } from "@/src/theme/tokens";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  keyboardView: {
    ...sharedStyles.keyboardView,
  },
  scrollView: {
    ...sharedStyles.scrollView,
  },
  scrollViewContent: {
    ...sharedStyles.scrollViewContent,
  },
  card: {
    ...sharedStyles.formContainer,
    backgroundColor: tokens.byteBgDefault,
  },
  title: {
    ...sharedStyles.title,
    fontSize: tokens.textLg, 
    lineHeight: tokens.lineHeightRelaxed,
  },
  label: {
    ...sharedStyles.label,
    fontSize: tokens.textSm,
  },
  input: {
    ...sharedStyles.input,
  },
  button: {
    ...sharedStyles.button,
    paddingVertical: tokens.spacingSm,
    width: '100%', 
  },
  buttonText: {
    ...sharedStyles.buttonText,
    fontSize: tokens.textSm,
  },
  submitButtonDisabled: {
    ...sharedStyles.buttonDisabled,
  },

  illustration: { 
    marginBottom: tokens.spacingSm,
    alignSelf: 'center',
  },
  inputError: { 
    borderColor: tokens.byteColorError 
  },
  errorText: {
    color: tokens.byteColorError,
    fontSize: tokens.textXs,
    marginTop: tokens.spacing2Xs,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: tokens.spacingSm,
  },
  checkbox: { 
    marginRight: tokens.spacingXs, 
    marginTop: tokens.spacing2Xs 
  },
  checkboxLabel: {
    flex: 1,
    fontSize: tokens.textSm,
    color: tokens.byteGray600,
    lineHeight: tokens.lineHeightRelaxed,
  },
  submitButton: { 
    backgroundColor: tokens.byteColorOrange500 
  },
  backButton: {
    borderWidth: 1,
    borderColor: tokens.byteColorDash,
    backgroundColor: tokens.byteBgDefault,
  },
  backText: {
    color: tokens.byteColorDash,
    fontWeight: tokens.fontSemibold,
    fontSize: tokens.textSm,
  },
});

