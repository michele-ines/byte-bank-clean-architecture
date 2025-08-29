import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type Styles = {
  container: ViewStyle;
  title: TextStyle;
  label: TextStyle;
  input: TextStyle; // 👈 corrigido aqui
  receiptButton: ViewStyle;
  receiptButtonText: TextStyle;
  submitButton: ViewStyle;
  submitButtonText: TextStyle;
};

export const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  label: { fontWeight: "600", marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  receiptButton: {
    backgroundColor: tokens.byteColorDash,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  receiptButtonText: { color: "#fff", fontWeight: "600" },
  submitButton: {
    backgroundColor: tokens.byteColorGreen500,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
