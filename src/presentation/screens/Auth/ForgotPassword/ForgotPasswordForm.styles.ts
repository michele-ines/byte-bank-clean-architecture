
import { border, colors, radius, spacing, typography } from "@presentation/theme";
import type { ForgotPasswordFormStyles } from "@shared/ProfileStyles/profile.styles.types";
import { StyleSheet } from "react-native";
import { sharedStyles } from "src/styles/shared.styles";

export const styles = StyleSheet.create<ForgotPasswordFormStyles>({
  card: {
    width: "100%",
    marginHorizontal: "auto",
    backgroundColor: colors.byteBgDefault,
    padding: spacing.ml,
    gap: spacing.xs,
    borderRadius: radius.md,
  },
  title: {
    ...sharedStyles.title,
    fontSize: typography.textLg,
    marginBottom: spacing.xs,
  },
  label: {
    ...sharedStyles.label,
    fontSize: typography.textSm,
  },
  input: {
    ...sharedStyles.input,
  },
  submitDisabled: {
    ...sharedStyles.buttonDisabled,
  },

  submit: {
    ...sharedStyles.button,
    width: "100%",
    backgroundColor: colors.byteColorGreen500,
  },
  submitText: {
    ...sharedStyles.buttonText,
  },
  backButton: {
    ...sharedStyles.button,
    width: "100%",
    borderWidth: 1,
    borderColor: colors.byteColorDash,
    backgroundColor: colors.byteBgDefault,
  },
  backText: {
    color: colors.byteColorDash,
    fontWeight: typography.fontSemibold,
    fontSize: typography.textSm,
  },

  inputError: {
    borderColor: colors.byteColorError,
    borderWidth:border.width2,
  },
  errorText: {
    color: colors.byteColorError,
    fontSize: typography.textXs,
    textAlign: typography.textAlignLeft,
    marginBottom: spacing.sm,
    marginTop: spacing.xs2,
  },
});
