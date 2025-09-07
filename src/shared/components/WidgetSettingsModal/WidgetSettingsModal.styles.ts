import { tokens } from "@/src/theme/tokens";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: tokens.flex1,
    backgroundColor: tokens.byteOverlay,
    justifyContent: tokens.alignCenter,
    alignItems: tokens.alignCenter,
  },
  modal: {
    width: tokens.width90Percent,      
    maxHeight: tokens.heightModalMax,  
    backgroundColor: tokens.byteColorWhite,
    borderRadius: tokens.radiusMd,
    padding: tokens.spacingMd,
  },
  title: {
    fontSize: tokens.textLg,
    fontWeight: tokens.fontBold,
    marginBottom: tokens.spacing2Xs,
  },
  description: {
    fontSize: tokens.textSm,
    color: tokens.byteTextMediumGray,
    marginBottom: tokens.spacingMd,
  },
  card: {
    borderWidth: tokens.borderWidthThin,
    borderColor: tokens.byteGray300,
    borderRadius: tokens.radiusSm,
    padding: tokens.spacingSm,
    marginBottom: tokens.spacingSm,
  },
  cardSelected: {
    borderColor: tokens.byteColorDash,
    backgroundColor: tokens.byteGray50,
  },
  cardHeader: {
    flexDirection: tokens.flexRow,
    justifyContent: tokens.justifyBetween,
    alignItems: tokens.alignCenter,
    marginBottom: tokens.spacing2Xs,
  },
  cardTitle: {
    fontWeight: tokens.fontSemibold,
    fontSize: tokens.textBase,
  },
  cardText: {
    fontSize: tokens.textSm,
    color: tokens.byteGray600,
    marginBottom: tokens.spacingSm,
  },
  previewBox: {
    borderWidth: tokens.borderWidthThin,
    borderColor: tokens.byteGray200,
    borderRadius: tokens.radiusSm,
    padding: tokens.spacingXs,
    backgroundColor: tokens.byteColorWhite,
  },
  previewHeader: {
    flexDirection: tokens.flexRow,
    alignItems: tokens.alignCenter,
    marginBottom: tokens.spacing2Xs,
  },
  previewTitle: {
    fontWeight: tokens.fontSemibold,
    fontSize: tokens.textSm,
  },
  previewText: {
    fontSize: tokens.textXs,
    color: tokens.byteGray600,
    marginBottom: tokens.spacingXs,
  },
  previewFooter: {
    flexDirection: tokens.flexRow,
    justifyContent: tokens.justifyBetween,
  },
  previewFooterText: {
    fontSize: tokens.textXs,
    color: tokens.byteGray600,
  },
  bold: {
    fontWeight: tokens.fontBold,
    color: tokens.byteColorBlack,
  },
  dangerText: {
    color: tokens.byteColorError,
    fontWeight: tokens.fontMedium,
  },
  successText: {
    color: tokens.byteColorGreen500,
    fontWeight: tokens.fontMedium,
  },
  icon: { color: tokens.byteGray700 },
  actions: {
    flexDirection: tokens.flexRow,
    justifyContent: tokens.justifyEnd,
    marginTop: tokens.spacingSm,
  },
  cancelButton: {
    paddingVertical: tokens.spacingXs,
    paddingHorizontal: tokens.spacingSm,
    borderRadius: tokens.radiusSm,
    backgroundColor: tokens.byteGray300,
    marginRight: tokens.spacingXs,
  },
  cancelText: {
    color: tokens.byteGray700,
    fontWeight: tokens.fontSemibold,
  },
  confirmButton: {
    paddingVertical: tokens.spacingXs,
    paddingHorizontal: tokens.spacingSm,
    borderRadius: tokens.radiusSm,
    backgroundColor: tokens.byteColorDash,
  },
  confirmText: {
    color: tokens.byteColorWhite,
    fontWeight: tokens.fontSemibold,
  },
});
