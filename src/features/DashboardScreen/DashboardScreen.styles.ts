import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type DashboardStyles = {
  wrapper: ViewStyle;
  row: ViewStyle;
  card: ViewStyle;
  cardTitle: TextStyle;
  cardValue: TextStyle;
  balance: ViewStyle;
  balanceLabel: TextStyle;
  balanceValue: TextStyle;
};

export const styles = StyleSheet.create<DashboardStyles>({
  wrapper: { flex: 1, padding: 16, backgroundColor: tokens.byteBgDashboard, gap: 16 },
  row: { flexDirection: "row", gap: 16 },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    minHeight: 140,
  },
  cardTitle: { fontWeight: "700", marginBottom: 8, color: tokens.byteColorDash },
  cardValue: { fontSize: 20, fontWeight: "700" },
  balance: {
    flex: 1,
    backgroundColor: "#0a4956",
    padding: 16,
    borderRadius: 12,
    minHeight: 140,
  },
  balanceLabel: { color: "#b6dde5", fontWeight: "700" },
  balanceValue: { color: "#fff", fontSize: 24, fontWeight: "800", marginTop: 12 },
});
