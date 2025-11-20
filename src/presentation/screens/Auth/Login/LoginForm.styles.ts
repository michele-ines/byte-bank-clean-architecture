
import { border, colors, layout, spacing, typography } from "@presentation/theme";
import { StyleSheet } from "react-native";
import { sharedStyles } from "src/styles/shared.styles";

export const styles = StyleSheet.create({
  keyboardView: {
    ...sharedStyles.keyboardView,
  },
  card: {
    ...sharedStyles.formContainer,
    backgroundColor: colors.byteColorGreen100,
  },
  illustration: {
    width: layout.widthFull,
    marginBottom: spacing.md,
  },
  title: {
    ...sharedStyles.title,
  },
  label: {
    ...sharedStyles.label,
  },
  input: {
    ...sharedStyles.input,
    backgroundColor: colors.byteColorGreen100,
  },
  button: {
    ...sharedStyles.button,
  },
  buttonText: {
    ...sharedStyles.buttonText,
  },
  submitButton: {
    backgroundColor: colors.byteColorGreen500,
  },
  submitButtonDisabled: {
    ...sharedStyles.buttonDisabled,
  },
  createButton: {
    backgroundColor: colors.byteColorOrange500,
  },
  alignButtons: {
    alignItems: typography.alignCenter,
  },
  forgot: {
    color: colors.byteColorGreen500,
    textAlign: typography.textAlignLeft,
    fontWeight: typography.fontSemibold,
    marginTop: spacing.xs2,
    marginBottom: spacing.md,
    textDecorationLine: typography.textDecorationUnderline,
  },

  inputError: {
    borderColor: colors.byteColorError,
    borderWidth: border.width2,
  },
  errorText: {
    color: colors.byteColorError,
    fontSize: typography.textXs,
    textAlign: typography.textAlignLeft,
    marginBottom: spacing.sm,
    marginTop: spacing.xs2,
  },
});
