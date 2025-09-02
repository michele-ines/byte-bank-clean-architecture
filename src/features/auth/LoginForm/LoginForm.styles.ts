import { tokens } from "@/src/theme/tokens";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

type LoginFormStyles = {
  card: ViewStyle;
  illustration: ImageStyle;
  title: TextStyle;
  label: TextStyle;
  input: TextStyle; 
  forgot: TextStyle;
  button: ViewStyle;
  alignButtons: ViewStyle;
  submitButton: ViewStyle;
  createButton: ViewStyle;
  buttonText: TextStyle;
};

export const styles = StyleSheet.create<LoginFormStyles>({
  card: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: tokens.byteColorGreen100,
    paddingHorizontal: 24,
    gap: 12,
  },
  illustration: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: tokens.byteGray800,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: tokens.byteGray800,
    marginBottom: -4,
  },
  input: {
    borderWidth: 1,
    borderColor: tokens.byteGray200,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: tokens.byteColorGreen100,
  },
  forgot: {
    color: tokens.byteColorGreen500,
    textAlign: "left",
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 16,
    textDecorationLine: 'underline'
  },
  button: {
    width: 144,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  alignButtons: {
    alignItems: 'center'
  },
  submitButton: {
    backgroundColor: tokens.byteColorGreen500,
  },
  createButton: {
    backgroundColor: tokens.byteColorOrange500,
  },
  buttonText: {
    color: tokens.gradientTealTo,
    fontWeight: "bold",
    fontSize: 16,
  },
});
