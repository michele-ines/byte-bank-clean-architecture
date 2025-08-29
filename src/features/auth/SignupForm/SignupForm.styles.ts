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
  title: { fontSize: 18, fontWeight: "700", textAlign: "center", marginBottom: 8 },
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
  errorText: { color: tokens.byteColorRed500, fontSize: 12, marginBottom: 4 },
  checkboxContainer: { flexDirection: "row", alignItems: "flex-start", marginVertical: 8 },
  checkbox: { marginRight: 8, marginTop: 3 },
  checkboxLabel: { flex: 1, fontSize: 12, color: tokens.byteGray600 },

  button: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButton: { backgroundColor: tokens.byteColorBlue500 },
  buttonText: { color: tokens.byteBgDefault, fontWeight: "700" },

  backButton: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: tokens.byteGray300,
    backgroundColor: tokens.byteBgDefault,
  },
  backText: { color: tokens.byteGray700, fontWeight: "600" },
});
