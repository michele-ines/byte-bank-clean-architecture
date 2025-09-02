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
    marginHorizontal: "auto",
    backgroundColor: tokens.byteBgDefault,
    padding: 20,
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
    backgroundColor: tokens.byteColorGreen500,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: { color: tokens.byteBgDefault, fontWeight: "700" },

  backButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: tokens.byteBgDefault,
    marginTop: tokens.spacingXs,
    borderColor: tokens.byteColorDash,
  },
  backText: {
    color: tokens.byteGray700,
    fontWeight: "600",
    fontSize: 14,
  },
});
