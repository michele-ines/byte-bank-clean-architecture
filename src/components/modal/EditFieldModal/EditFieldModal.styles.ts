import {
  border,
  colors,
  layout,
  radius,
  sizes,
  spacing,
  typography,
} from "@/src/theme";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type EditFieldModalStyles = {
  field: ViewStyle;
  label: TextStyle;
  input: TextStyle;
  inputEditing: ViewStyle;
  modalOverlay: ViewStyle;
  modalContent: ViewStyle;
  modalTitle: TextStyle;
  modalActions: ViewStyle;
  cancelButton: ViewStyle;
  cancelButtonText: TextStyle;
  modalInput: TextStyle;
  showPasswordBtn: ViewStyle;
  saveButton: ViewStyle;
  saveButtonText: TextStyle;
  inputWrapper: ViewStyle;
  errorText: TextStyle;
};

export const styles = StyleSheet.create<EditFieldModalStyles>({
  field: {
    marginBottom: spacing.sm2,
  },
  label: {
    fontFamily: typography.fontInter,
    fontWeight: typography.fontBold,
    fontSize: typography.textSm,
    color: colors.byteColorBlack,
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
    height: sizes.buttonHeight,
  },
  input: {
    flex: layout.flex1,
    height: sizes.buttonHeight,
    maxWidth: layout.width90Percent,
    fontSize: typography.textBase,
    color: colors.byteTextMediumGray,
  },
  inputEditing: {
    borderColor: colors.byteColorGreen500,
  },
  modalOverlay: {
    flex: layout.flex1,
    backgroundColor: colors.byteColorOverlay,
    padding: spacing.sm2,
  },
  modalContent: {
    width: layout.widthFull,
    backgroundColor: colors.byteBgDefault,
    borderRadius: radius.md,
    padding: spacing.ml,
    marginTop: layout.modalTopPosition,
  },
  modalTitle: {
    fontSize: typography.textMd,
    fontWeight: typography.fontBold,
    marginBottom: spacing.xl,
    color: colors.byteColorDash2,
    textAlign: typography.textAlignCenter,
  },
  modalInput: {
    borderWidth: border.widthThin,
    borderColor: colors.byteGray100,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm2,
    fontSize: typography.textBase,
    color: colors.byteTextMediumGray,
    marginBottom: spacing.sm,
  },
  showPasswordBtn: {
    position: layout.positionAbsolute,
    right: spacing.sm2,
    top: "50%",
    transform: [{ translateY: -11 }],
  },
  modalActions: {
    flexDirection: layout.flexRow,
    justifyContent: typography.justifyEnd,
    marginTop: spacing.sm2,
  },
  cancelButton: {
    paddingVertical: spacing.sm2,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    marginRight: spacing.xs,
    backgroundColor: colors.byteGray200,
  },
  cancelButtonText: {
    fontSize: typography.textSm,
    color: colors.byteTextMediumGray,
  },
  saveButton: {
    backgroundColor: colors.byteColorGreen500,
    paddingVertical: spacing.sm2,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
  },
  saveButtonText: {
    fontSize: typography.textSm,
    color: colors.byteColorWhite,
  },
  errorText: {
    color: colors.byteColorError,
    fontSize: typography.textXs,
    marginTop: spacing.xs2,
  },
});
