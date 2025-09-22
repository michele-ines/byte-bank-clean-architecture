import { sharedStyles } from "@/src/styles/shared.styles";
import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type Styles = {
  headerTitle: TextStyle;
  totalValue: TextStyle;
  summaryContainer: ViewStyle;
  summaryCard: ViewStyle;
  summaryCardTitle: TextStyle;
  summaryCardValue: TextStyle;
  statsTitle: TextStyle;
  statsCard: ViewStyle;
  chartContainer: ViewStyle;
  legendContainer: ViewStyle;
  legendItem: ViewStyle;
  legendDot: ViewStyle;
  legendText: TextStyle;
  container: ViewStyle;
  cardPixelsTop: ViewStyle;
  cardPixelsBotton: ViewStyle;
  content:ViewStyle;
};

export const styles = StyleSheet.create<Styles>({

  container: {
    flex: tokens.flex1,
    backgroundColor: tokens.byteGray,
    padding: tokens.spacingMd,
  },
  content: { padding: tokens.spacingMd },
  headerTitle: {
    fontSize: tokens.textXl,
    fontWeight: tokens.fontBold,
    textAlign: tokens.textAlignCenter,
    color: tokens.byteGray800,
    marginBottom: tokens.spacingSm,
  },
  totalValue: {
    fontSize: tokens.textLg,
    fontWeight: tokens.fontSemibold,
    textAlign: tokens.textAlignCenter,
    color: tokens.byteColorDash,
    marginBottom: tokens.spacingLg,
  },
  summaryContainer: {
    gap: tokens.spacingMd,
  },
  summaryCard: {
    backgroundColor: tokens.byteColorDash,
    borderRadius: tokens.radiusMd,
    padding: tokens.spacingMd,
    alignItems: tokens.alignCenter,
  },
  summaryCardTitle: {
    fontSize: tokens.textBase,
    color: tokens.byteGray200,
  },
  summaryCardValue: {
    fontSize: tokens.textLg,
    fontWeight: tokens.fontBold,
    color: tokens.byteColorWhite,
    marginTop: tokens.spacing2Xs,
  },
  statsTitle: {
    fontSize: tokens.textLg,
    fontWeight: tokens.fontSemibold,
    textAlign: tokens.textAlignCenter,
    color: tokens.byteGray700,
    marginVertical: tokens.spacingXl,
  },
  statsCard: {
    backgroundColor: tokens.byteColorDash,
    borderRadius: tokens.radiusMd,
    padding: tokens.spacingLg,
    alignItems:tokens.alignCenter,
  },
  chartContainer: {
    marginBottom: tokens.spacingLg,
  },
  legendContainer: {
    alignSelf: tokens.stretch,
    gap: tokens.spacingSm,
  },
  legendItem: {
    flexDirection: tokens.flexRow,
    alignItems: tokens.alignCenter,
    gap: tokens.spacingSm,
  },
  legendDot: {
    width: tokens.width12,
    height: tokens.height12,
    borderRadius: tokens.radiusSm,
  },
  legendText: {
    fontSize: tokens.textBase,
    color: tokens.byteColorWhite,
  },

  cardPixelsTop: {
    ...sharedStyles.backgroundPixelsTop,
  },
  cardPixelsBotton: {
    ...sharedStyles.backgroundPixelsBottom,
  },
});
