// src/components/NewTransactionForm.styles.ts

import { sharedStyles } from "@/src/styles/shared.styles";
import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type NewTransactionFormStyle = {
  safeArea: ViewStyle;
  container: ViewStyle;
  scrollContentContainer: ViewStyle;
  title: TextStyle;
  pickerContainer: ViewStyle;
  label: TextStyle;
  input: TextStyle;
  submitButton: ViewStyle;
  submitButtonText: TextStyle;
  cardPixelsTop: ViewStyle;
  cardPixelsBotton: ViewStyle;
  illustration: ViewStyle;
  bottomIllustrationsContainer: ViewStyle;
  dropdownPicker:ViewStyle;
};

export const styles = StyleSheet.create<NewTransactionFormStyle>({
  safeArea: {
    flex: tokens.flex1,
    backgroundColor: tokens.byteGray,
  },
  container: {
    flex: tokens.flex1,
    backgroundColor: tokens.byteGray,
  },
  scrollContentContainer: {
    flexGrow: tokens.flex1,
    justifyContent: tokens.alignCenter,
    alignItems: tokens.stretch,
    padding: tokens.spacingMl,
  },
  title: {
    fontSize: tokens.textXl,
    fontWeight: tokens.fontBold,
    color: tokens.byteGray700,
    marginBottom: tokens.spacingXxl,
    textAlign: tokens.alignCenter,
  },
  pickerContainer: {
    width: tokens.widthFull,
    backgroundColor: tokens.byteColorWhite,
    borderRadius: tokens.radiusSm,
    borderWidth: tokens.borderWidthThin,
    borderColor: tokens.byteGray300,
    marginBottom: tokens.spacingMl,
    height: tokens.height50,
    justifyContent: tokens.alignCenter,
    zIndex: tokens.zIndex1,
    elevation:tokens.elevation1
  },

  label: {
    fontSize: tokens.textBase,
    color: tokens.byteGray700,
    marginBottom: tokens.spacingXs,
    alignSelf: tokens.alignFlexStart,
  },
  input: {
    width: tokens.widthFull,
    height:tokens.height50,
    backgroundColor: tokens.byteColorWhite,
    borderRadius: tokens.radiusSm,
    borderWidth: tokens.borderWidthThin,
    borderColor: tokens.byteGray300,
    paddingHorizontal: tokens.spacingMd,
    fontSize: tokens.textBase,
    color: tokens.byteGray700,
    textAlign: tokens.alignCenter,
    marginBottom: tokens.spacingMl,
  },
  submitButton: {
    backgroundColor: tokens.byteColorDash,
    paddingVertical:tokens.spacingMd,
    borderRadius: tokens.radiusX1,
    width: tokens.widthFull,
    alignItems: tokens.alignCenter,
    elevation: tokens.elevation,
    shadowColor: tokens.byteColorBlack,
    shadowOffset: { width: tokens.width0, height: tokens.height2 },
    shadowOpacity: tokens.opacitySm,
    shadowRadius: tokens.radiusMini,
    marginTop: tokens.spacingSm,
  },
  submitButtonText: {
    color: tokens.byteColorWhite,
    fontSize: tokens.textBase,
    fontWeight: tokens.fontBold,
  },
  cardPixelsTop: {
    ...sharedStyles.backgroundPixelsTop,
  },
  cardPixelsBotton:{
    ...sharedStyles.backgroundPixelsBottom,
  },
  illustration: {
    position:tokens.absolute,
    opacity:tokens.opacityLg,
    maxWidth:tokens.width220,
    alignSelf: tokens.alignCenter,
    zIndex: tokens.zIndex2,
  },
  bottomIllustrationsContainer: {
    width: tokens.widthFull,
    alignItems: tokens.alignCenter,
    marginTop: tokens.spacingXxl,
    minHeight: tokens.minHeight,
  },
  dropdownPicker:{
    borderWidth: tokens.borderLeft0,
    elevation: tokens.elevation0, 
    shadowOpacity: tokens.opacity0, 
    backgroundColor: tokens.byteColorWhite, 
  }
});