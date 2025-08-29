import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type ForgotPasswordFormStyles = {
  card: ViewStyle;
  title: TextStyle;
  label: TextStyle;
  input: TextStyle;
  submit: ViewStyle;
  submitText: TextStyle;
  backButton: ViewStyle;
  backText: TextStyle;
};

export const styles = StyleSheet.create<ForgotPasswordFormStyles>({
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
  submit: {
    marginTop: 12,
    backgroundColor: tokens.byteColorBlue500,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: { color: tokens.byteBgDefault, fontWeight: "700" },

  backButton: {
    marginTop: 8,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: tokens.byteGray300,
    backgroundColor: tokens.byteBgDefault,
  },
  backText: {
    color: tokens.byteGray700,
    fontWeight: "600",
    fontSize: 14,
  },
});
