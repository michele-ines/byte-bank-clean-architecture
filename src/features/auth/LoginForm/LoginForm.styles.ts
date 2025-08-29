import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type LoginFormStyles = {
  card: ViewStyle;
  illustration: ViewStyle;
  title: TextStyle;
  label: TextStyle;
  input: TextStyle;
  inputError: TextStyle;
  forgot: TextStyle;
  alignButtons: ViewStyle;
  button: ViewStyle;
  submitButton: ViewStyle;
  createButton: ViewStyle;
  buttonText: TextStyle;
};

export const styles = StyleSheet.create<LoginFormStyles>({
  card: {
    width: "100%",
    maxWidth: 720,
    marginHorizontal: "auto",
    backgroundColor: tokens.byteBgDefault,
    borderRadius: 12,
    padding: 20,
    shadowColor: tokens.byteGray900,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    gap: 8,
  },
  illustration: { marginBottom: 12 },
  title: { fontSize: 20, fontWeight: "700", textAlign: "center", marginBottom: 8 },
  label: { fontSize: 14, fontWeight: "600", color: tokens.byteGray700 },
  input: {
    borderWidth: 1,
    borderColor: tokens.byteGray300,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: tokens.byteGray50,
  },
  inputError: { borderColor: tokens.byteColorRed500 },
  forgot: { color: tokens.byteGray600, fontSize: 13, textAlign: "right" },
  alignButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  button: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButton: { backgroundColor: tokens.byteColorBlue500 },
  createButton: { backgroundColor: tokens.byteGray200 },
  buttonText: { color: tokens.byteBgDefault, fontWeight: "700" },
});
