import { border, colors, layout, radius, sizes, spacing, typography } from "@/presentation/styles/theme";
import type { CardMinhaContaStyles } from "@/shared/interfaces/auth.interfaces";
import { sharedStyles } from "@/shared/styles/shared.styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create<CardMinhaContaStyles>({
  title: {
    ...sharedStyles.title,
  },
  field: {
    marginBottom: spacing.sm2,
  },
  label: {
    ...sharedStyles.label,
    margin: spacing.xs,
  },
  inputWrapper: {
    flexDirection: layout.flexRow,
    alignItems: typography.alignCenter,
    borderWidth: border.widthThin,
    borderColor: colors.byteGray300,
    borderRadius: radius.sm,
    backgroundColor: colors.byteBgDefault,
    paddingHorizontal: spacing.sm2,
  },
  input: {
    flex: layout.flex1,
    height: sizes.buttonHeight,
    fontSize: typography.textBase,
    color: colors.byteTextMediumGray,
    maxWidth: layout.width90Percent,
  },
  inputEditing: {
    borderColor: colors.byteColorGreen500,
  },
  icon: {
    fontSize: layout.width20,
  },
});
