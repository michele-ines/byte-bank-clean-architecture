import { sharedStyles } from "@/src/styles/shared.styles";
import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type ForgotPasswordFormStyles = {
  card: ViewStyle;
  title: TextStyle;
  label: TextStyle;
  input: TextStyle; 
  submit: ViewStyle;
  submitText: TextStyle;
  backButton: ViewStyle;
  backText: TextStyle;
  submitDisabled: ViewStyle;
};

export const styles = StyleSheet.create<ForgotPasswordFormStyles>({
  card: {

    width: "100%",
    marginHorizontal: "auto",
    backgroundColor: tokens.byteBgDefault,
    padding: tokens.spacingMl,
    gap: tokens.spacingXs,
    borderRadius: tokens.radiusMd, 
  },
  title: {
    ...sharedStyles.title,
    fontSize: tokens.textLg,
    marginBottom: tokens.spacingXs,
  },
  label: {
    ...sharedStyles.label,
    fontSize: tokens.textSm,
  },
  input: {
    ...sharedStyles.input,
  },
  submitDisabled: {
    ...sharedStyles.buttonDisabled,
  },
  
  submit: {
    ...sharedStyles.button,
    width: '100%',
    backgroundColor: tokens.byteColorGreen500,
  },
  submitText: {
    ...sharedStyles.buttonText,
  },
  backButton: {
    ...sharedStyles.button, 
    width: '100%', 
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

