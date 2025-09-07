import { tokens } from "@/src/theme/tokens";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: tokens.byteOverlay,
  },
  sheet: {
    position: tokens.positionAbsolute, 
    left: tokens.spacingMd,
    right: tokens.spacingMd,
    top: tokens.modalTopPosition, 
    borderRadius: tokens.radiusMd,
    padding: tokens.spacingMd,
    backgroundColor: tokens.byteBgDefault,
    shadowColor: tokens.shadowColor,
    shadowOpacity: tokens.shadowOpacity,
    shadowOffset: tokens.shadowOffset,
    shadowRadius: tokens.shadowRadius,
    elevation: tokens.shadowElevation,
  },
  title: {
    fontSize: tokens.textLg,
    fontWeight: tokens.fontBold,
    color: tokens.byteColorBlack,
    marginBottom: tokens.spacing2Xs,
    textAlign: tokens.textAlignCenter, // 👈 antes "center"
  },
  msg: {
    fontSize: tokens.textSm,
    color: tokens.byteTextMediumGray,
    marginBottom: tokens.spacingSm,
    textAlign: tokens.textAlignCenter,
  },
  row: {
    flexDirection: tokens.flexRow,
    justifyContent: tokens.justifyCenter, // 👈 antes "center"
    gap: tokens.spacingSm,
  },
  btn: {
    minWidth: tokens.buttonMinWidth,
    maxWidth: tokens.buttonMaxWidth,
    height: tokens.buttonHeight,
    borderRadius: tokens.radiusSm,
    alignItems: tokens.alignCenter,
    justifyContent: tokens.alignCenter,
    paddingHorizontal: tokens.spacingSm,
    flex: 1,
  },
  btnPrimary: { backgroundColor: tokens.byteColorOrange500 },
  btnDanger: { backgroundColor: tokens.byteColorRed500 },
  btnText: {
    color: tokens.byteColorWhite,
    fontWeight: tokens.fontBold,
  },
  btnGhost: {
    backgroundColor: "transparent",
    borderWidth: tokens.borderWidthThin,
    borderColor: tokens.byteGray300,
  },
  btnGhostText: {
    color: tokens.byteGray800,
    fontWeight: tokens.fontBold,
  },
  pressed: { opacity: 0.8 },
  loadingBtn: { opacity: 0.7 },
});
