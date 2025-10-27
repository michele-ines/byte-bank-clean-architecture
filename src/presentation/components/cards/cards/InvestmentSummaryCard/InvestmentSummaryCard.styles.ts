import { colors, layout, radius, spacing, typography } from "@presentation/theme";
import type { DashboardStyles } from "@shared/ProfileStyles/profile.styles.types";
import { StyleSheet } from "react-native";
import { sharedStyles } from "src/styles/shared.styles";

export const styles = StyleSheet.create<DashboardStyles>({
  container: {
    flex: layout.one,
    backgroundColor: colors.byteGray,
    padding: spacing.md,
  },
  content: { padding: spacing.md },
  headerTitle: {
    fontSize: typography.textXl,
    fontWeight: typography.fontBold,
    textAlign: typography.textAlignCenter,
    color: colors.byteGray800,
    marginBottom: spacing.sm,
  },
  totalValue: {
    fontSize: typography.textLg,
    fontWeight: typography.fontSemibold,
    textAlign: typography.textAlignCenter,
    color: colors.byteColorDash,
    marginBottom: spacing.lg,
  },
  summaryContainer: {
    gap: spacing.md,
  },
  summaryCard: {
    backgroundColor: colors.byteColorDash,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: typography.alignCenter,
  },
  summaryCardTitle: {
    fontSize: typography.textBase,
    color: colors.byteGray200,
  },
  summaryCardValue: {
    fontSize: typography.textLg,
    fontWeight: typography.fontBold,
    color: colors.byteColorWhite,
    marginTop: spacing.xs2,
  },
  statsTitle: {
    fontSize: typography.textLg,
    fontWeight: typography.fontSemibold,
    textAlign: typography.textAlignCenter,
    color: colors.byteGray700,
    marginVertical: spacing.xl,
  },
  statsCard: {
    backgroundColor: colors.byteColorDash,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: typography.alignCenter,
  },
  chartContainer: {
    marginBottom: spacing.lg,
  },
  legendContainer: {
    alignSelf: layout.stretch,
    gap: spacing.sm,
  },
  legendItem: {
    flexDirection: layout.flexRow,
    alignItems: typography.alignCenter,
    gap: spacing.sm,
  },
  legendDot: {
    width: layout.width12,
    height: layout.height12,
    borderRadius: radius.sm,
  },
  legendText: {
    fontSize: typography.textBase,
    color: colors.byteColorWhite,
  },
  cardPixelsTop: {
    ...sharedStyles.backgroundPixelsTop,
  },
  cardPixelsBotton: {
    ...sharedStyles.backgroundPixelsBottom,
  },
});
