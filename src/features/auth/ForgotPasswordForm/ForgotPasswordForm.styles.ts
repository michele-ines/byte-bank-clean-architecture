import { ForgotPasswordFormStyles } from "@/src/shared/ProfileStyles/profile.styles.types";
import { sharedStyles } from "@/src/styles/shared.styles";
import { colors } from "@/src/theme/colors";
import { radius } from "@/src/theme/radius";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";
import { StyleSheet } from "react-native";

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
});
