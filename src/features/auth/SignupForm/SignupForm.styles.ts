import { sharedStyles } from "@/src/styles/shared.styles";
import { border } from "@/src/theme/border";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";
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
    backgroundColor: colors.byteBgDefault,
  },
  title: {
    ...sharedStyles.title,
    fontSize: typography.textLg,
    lineHeight: typography.lineHeightRelaxed,
  },
  label: {
    ...sharedStyles.label,
    fontSize: typography.textSm,
  },
  input: {
    ...sharedStyles.input,
  },
  button: {
    ...sharedStyles.button,
    paddingVertical: spacing.sm,
    width: layout.widthFull,
  },
  buttonText: {
    ...sharedStyles.buttonText,
    fontSize: typography.textSm,
  },
  submitButtonDisabled: {
    ...sharedStyles.buttonDisabled,
  },

  illustration: {
    marginBottom: spacing.sm,
    alignSelf: typography.alignCenter,
  },
  inputError: {
    borderColor: colors.byteColorError,
  },
  errorText: {
    color: colors.byteColorError,
    fontSize: typography.textXs,
    marginTop: spacing.sm,
  },
  checkboxContainer: {
    flexDirection: layout.flexRow,
    alignItems: typography.alignFlexStart,
    marginVertical: spacing.sm,
  },
  checkbox: {
    marginRight: spacing.xs,
    marginTop: spacing.xs,
  },
  checkboxLabel: {
    flex: layout.flex1,
    fontSize: typography.textSm,
    color: colors.byteGray600,
    lineHeight: typography.lineHeightRelaxed,
  },
  submitButton: {
    backgroundColor: colors.byteColorOrange500,
  },
  backButton: {
    borderWidth: border.widthThin,
    borderColor: colors.byteColorDash,
    backgroundColor: colors.byteBgDefault,
  },
  backText: {
    color: colors.byteColorDash,
    fontWeight: typography.fontSemibold,
    fontSize: typography.textSm,
  },
});
