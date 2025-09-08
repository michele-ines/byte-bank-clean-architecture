import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

// Tipagem para os estilos partilhados
type SharedStyles = {
  keyboardView: ViewStyle;
  scrollView: ViewStyle;
  scrollViewContent: ViewStyle;
  formContainer: ViewStyle;
  title: TextStyle;
  label: TextStyle;
  input: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  buttonDisabled: ViewStyle;
  backgroundPixelsTop : ViewStyle;
  backgroundPixelsBottom: ViewStyle;
};

export const sharedStyles = StyleSheet.create<SharedStyles>({
  keyboardView: {
    flex: tokens.flex1,
  },
  scrollView: {
    flex: tokens.flex1,
    backgroundColor: tokens.byteBgDefault,
  },
  scrollViewContent: {
    flexGrow: tokens.flex1,
  },
  formContainer: {
    flex: tokens.flex1,
    justifyContent: tokens.alignCenter,
    padding: tokens.spacingLg,
    gap: tokens.spacingSm,
  },
  title: {
    fontSize: tokens.textXl,
    fontWeight: tokens.fontBold,
    textAlign: tokens.alignCenter,
    color: tokens.byteGray800,
    marginBottom: tokens.spacingMd,
  },
  label: {
    fontSize: tokens.textBase,
    fontWeight: tokens.fontSemibold,
    color: tokens.byteGray700,
    marginBottom: tokens.spacing2Xs,
  },
  input: {
    borderWidth: tokens.borderWidthThin,
    borderColor: tokens.byteGray300,
    borderRadius: tokens.radiusSm,
    paddingHorizontal: tokens.spacingSm,
    paddingVertical: tokens.spacingSm,
    fontSize: tokens.textBase,
    backgroundColor: tokens.byteGray50,
    color: tokens.byteGray800,
  },
  // Botões
  button: {
    paddingVertical:tokens.spacingMd, 
    borderRadius: tokens.radiusSm,
    alignItems: tokens.alignCenter,
    marginTop: tokens.spacingXs,
    width: tokens.width150,
  },
  buttonText: {
    color: tokens.byteColorWhite,
    fontWeight: tokens.fontBold,
    fontSize: tokens.textBase,
  },
  buttonDisabled: {
    backgroundColor: tokens.byteGray400,
  },
  backgroundPixelsTop : {
    position: tokens.absolute,
    top: tokens.width0,
    left: tokens.width0,
    width: tokens.width90Percent,
    height: tokens.widthFull,
    opacity: tokens.opacityImage, 
  },
  backgroundPixelsBottom: {
    position: tokens.absolute,
    bottom: tokens.width0,
    right: tokens.width0,
    width: tokens.width45Percent, 
    height: tokens.height50Percent, 
    opacity: tokens.opacityImage, 
  },
});
