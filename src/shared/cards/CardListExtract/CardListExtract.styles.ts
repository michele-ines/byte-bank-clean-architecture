import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type Styles = {
  container: ViewStyle;
  title: TextStyle;
  card: ViewStyle;
  row: ViewStyle;
  description: TextStyle;
  amount: TextStyle;
  date: TextStyle;
  empty: TextStyle;
  receiptButton: ViewStyle;
  receiptButtonText: TextStyle;
};

export const styles = StyleSheet.create<Styles>({
  container: { flex: 1, gap: 8 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 6,
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  description: { fontSize: 16, fontWeight: "500", color: tokens.byteColorDash },
  amount: { fontSize: 16, fontWeight: "700", color: tokens.byteColorGreen500 },
  date: { fontSize: 12, color: "#777" },
  empty: { fontSize: 14, color: "#aaa", textAlign: "center", marginTop: 20 },
  receiptButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: tokens.byteColorGreen500,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  receiptButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
