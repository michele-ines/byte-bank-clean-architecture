import { sharedStyles } from "@/src/styles/shared.styles";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";
import { StyleSheet } from "react-native";

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
});
