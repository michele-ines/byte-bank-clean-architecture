import { tokens } from "@/src/theme/tokens";
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
    marginBottom: tokens.spacing2Sm,
  },
  label: {
    fontFamily: tokens.fontInter,
    fontWeight: tokens.fontBold,
    fontSize: tokens.textSm,
    color: tokens.byteColorBlack,
    marginBottom: tokens.spacingXs,
  },
  inputWrapper: {
    flexDirection: tokens.flexRow,
    alignItems: tokens.alignCenter,
    borderWidth: tokens.borderWidthThin,
    borderColor: tokens.byteGray300,
    borderRadius: tokens.radiusSm,
    backgroundColor: tokens.byteBgDefault,
    paddingHorizontal: tokens.spacing2Sm,
    height: tokens.buttonHeight,
  },
  input: {
    flex: tokens.flex1,
    height: tokens.buttonHeight,
    maxWidth: tokens.width90Percent,
    fontSize: tokens.textBase,
    color: tokens.byteTextMediumGray,
  },
  inputEditing: {
    borderColor: tokens.byteColorGreen500,
  },
  modalOverlay: {
    flex: tokens.flex1,
    backgroundColor: tokens.byteColorOverlay,
    padding: tokens.spacing2Sm,
  },
  modalContent: {
    width: tokens.widthFull,
    backgroundColor: tokens.byteBgDefault,
    borderRadius: tokens.radiusMd,
    padding: tokens.spacingMl,
    marginTop: tokens.modalTopPosition,
  },
  modalTitle: {
    fontSize: tokens.textMd,
    fontWeight: tokens.fontBold,
    marginBottom: tokens.spacingXl,
    color: tokens.byteColorDash2,
    textAlign: tokens.textAlignCenter,
  },
  modalInput: {
    borderWidth: tokens.borderWidthThin,
    borderColor: tokens.byteGray100,
    borderRadius: tokens.radiusSm,
    paddingHorizontal: tokens.spacingSm,
    paddingVertical: tokens.spacing2Sm,
    fontSize: tokens.textBase,
    color: tokens.byteTextMediumGray,
    marginBottom: tokens.spacingSm,
  },
  showPasswordBtn: {
    position: tokens.positionAbsolute,
    right: tokens.spacing2Sm,
    top: "50%",
    transform: [{ translateY: -11 }],
  },
  modalActions: {
    flexDirection: tokens.flexRow,
    justifyContent: tokens.justifyEnd,
    marginTop: tokens.spacingSm,
  },
  cancelButton: {
    paddingVertical: tokens.spacing2Sm,
    paddingHorizontal: tokens.spacingMd,
    borderRadius: tokens.radiusSm,
    marginRight: tokens.spacingXs,
    backgroundColor: tokens.byteGray200,
  },
  cancelButtonText: {
    fontSize: tokens.textSm,
    color: tokens.byteTextMediumGray,
  },
  saveButton: {
    backgroundColor: tokens.byteColorGreen500,
    paddingVertical: tokens.spacing2Sm,
    paddingHorizontal: tokens.spacingMd,
    borderRadius: tokens.radiusSm,
  },
  saveButtonText: {
    fontSize: tokens.textSm,
    color: tokens.byteColorWhite,
  },
  errorText: {
    color: tokens.byteColorError,
    fontSize: tokens.textXs,
    marginTop: tokens.spacing2Xs,
  },
});
