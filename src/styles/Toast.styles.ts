import { StyleSheet } from "react-native";
import { ToastStyles } from "../shared/ProfileStyles/profile.styles.types";
import { border } from "../theme/border";
import { colors } from "../theme/colors";
import { layout } from "../theme/layout";
import { radius } from "../theme/radius";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

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
