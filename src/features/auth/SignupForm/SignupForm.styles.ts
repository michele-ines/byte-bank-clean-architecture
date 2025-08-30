import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type SignupFormStyles = {
  card: ViewStyle;
  illustration: ViewStyle;
  title: TextStyle;
  label: TextStyle;
  input: TextStyle;
  inputError: TextStyle;
  errorText: TextStyle;
  checkboxContainer: ViewStyle;
  checkbox: ViewStyle;
  checkboxLabel: TextStyle;
  button: ViewStyle;
  submitButton: ViewStyle;
  buttonText: TextStyle;
  backButton: ViewStyle;
  backText: TextStyle;
};

export const styles = StyleSheet.create<SignupFormStyles>({
  card: {
    width: "100%",
    maxWidth: 720,
    marginHorizontal: "auto",
    backgroundColor: tokens.byteBgDefault,
    borderRadius: tokens.radiusMd,
    padding: tokens.spacingLg,
    shadowColor: tokens.byteGray900,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    gap: tokens.spacingSm,
  },
  illustration: { marginBottom: tokens.spacingSm },
  title: {
    fontSize: tokens.textLg,
    fontWeight: tokens.fontBold,
    textAlign: "center",
    marginBottom: tokens.spacingSm,
    color: tokens.byteGray800,
    lineHeight: tokens.lineHeightRelaxed,
  },
  label: {
    fontSize: tokens.textSm,
    fontWeight: tokens.fontSemibold,
    color: tokens.byteGray700,
    marginBottom: tokens.spacing2Xs,
  },
  input: {
    borderWidth: 1,
    borderColor: tokens.byteGray300,
    borderRadius: tokens.radiusSm,
    paddingHorizontal: tokens.spacingSm,
    paddingVertical: tokens.spacingSm,
    fontSize: tokens.textBase,
    backgroundColor: tokens.byteGray50,
    color: tokens.byteGray800,
  },
  inputError: { borderColor: tokens.byteColorRed500 },
  errorText: {
    color: tokens.byteColorRed500,
    fontSize: tokens.textXs,
    marginBottom: tokens.spacing2Xs,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: tokens.spacingSm,
  },
  checkbox: { marginRight: tokens.spacingXs, marginTop: 3 },
  checkboxLabel: {
    flex: 1,
    fontSize: tokens.textSm,
    color: tokens.byteGray600,
    lineHeight: tokens.lineHeightRelaxed,
  },
  button: {
    marginTop: tokens.spacingSm,
    paddingVertical: tokens.spacingSm,
    borderRadius: tokens.radiusSm,
    alignItems: "center",
  },
  submitButton: { backgroundColor: tokens.byteColorOrange500 },
  buttonText: {
    color: tokens.byteBgDefault,
    fontWeight: tokens.fontBold,
    fontSize: tokens.textSm,
  },
  backButton: {
    marginTop: tokens.spacingXs,
    borderWidth: 1,
    borderColor: tokens.byteColorDash,
    backgroundColor: tokens.byteBgDefault,
  },
  backText: {
    color: tokens.byteColorDash,
    fontWeight: tokens.fontSemibold,
    fontSize: tokens.textSm,
  },
});
