import { border, colors, layout, spacing, typography } from "@presentation/theme";
import type { TextStyle, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";

interface Styles {
  label: TextStyle;
  passwordContainer: ViewStyle;
  input: TextStyle;
  passwordInput: TextStyle;
  inputError: TextStyle;
  eyeIcon: ViewStyle;
  errorText: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  label: {
    fontSize: typography.textBase,
    fontWeight: typography.fontMedium,
    color: colors.byteColorDash,
    marginBottom: spacing.xs,
  },
  passwordContainer: {
    position: layout.positionRelative,
    width: layout.widthFull,
  },
  input: {
    borderWidth: border.widthThin,
    borderColor: colors.byteGray350,
    borderRadius: spacing.xs,
    padding: spacing.sm,
    fontSize: typography.textBase,
    color: colors.byteColorDash,
    backgroundColor: colors.byteColorWhite,
  },
  passwordInput: {
    paddingRight: spacing.xxl,
  },
  inputError: {
    borderColor: colors.byteColorError,
    borderWidth: border.width2,
  },
  eyeIcon: {
    position: layout.positionAbsolute,
    right: spacing.sm,
    top: spacing.sm,
    padding: spacing.xs2,
    zIndex: layout.zIndex1,
  },
  errorText: {
    color: colors.byteColorError,
    fontSize: typography.textXs,
    textAlign: typography.textAlignLeft,
    marginTop: spacing.xs2,
    marginBottom: spacing.xs2,
  },
});
