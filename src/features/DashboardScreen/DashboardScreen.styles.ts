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
  wrapper: { flex: tokens.flex1, paddingVertical: tokens.spacingMd, backgroundColor: tokens.byteBgDashboard, gap: tokens.spacingMd },
  row: { flexDirection: tokens.flexRow, gap: tokens.spacingMd },
  card: {
    flex: tokens.flex1,
    backgroundColor: tokens.byteColorWhite,
    padding: tokens.spacingMd,
    borderRadius: tokens.spacingSm,
    minHeight: tokens.buttonMinWidth,
  },
  cardTitle: { fontWeight: tokens.fontBold, marginBottom: 8, color: tokens.byteColorDash },
  cardValue: { fontSize: tokens.textLg, fontWeight: tokens.fontBold },
  balance: {
    flex: tokens.flex1,
    backgroundColor: tokens.byteColorDash2,
    padding: tokens.spacingMd,
    borderRadius: tokens.spacingSm,
    minHeight: tokens.buttonMinWidth,
  },
  balanceLabel: { color: tokens.byteColorBlue100, fontWeight:tokens.fontBold },
  balanceValue: { color: tokens.byteColorWhite, fontSize: tokens.textXl, fontWeight: tokens.fontExtraBold, marginTop: tokens.spacingSm },
});
