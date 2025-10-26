import { StyleSheet } from "react-native";

import { border, colors, layout, radius, spacing, typography } from "@presentation/theme";
import { ToastStyles } from "@shared/ProfileStyles/profile.styles.types";

export const toastStyles = StyleSheet.create<ToastStyles>({
  baseToast: {
    borderLeftWidth: border.left0,
    borderRadius: radius.sm,
    width: layout.width90Percent,
    height: layout.height80,
    padding: spacing.md,
  },
  errorToast: {
    backgroundColor: colors.byteColorError,
  },
  successToast: {
    backgroundColor: colors.byteColorGreen500,
  },
  text1: {
    fontSize: typography.textBase,
    fontWeight: typography.fontBold,
    color: colors.byteColorWhite,
  },
  text2: {
    fontSize: typography.textSm,
    color: colors.byteColorWhite,
  },
});
