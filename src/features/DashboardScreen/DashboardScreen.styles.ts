import { DashboardExtraStyles } from "@/src/shared/ProfileStyles/profile.styles.types";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import { sizes } from "@/src/theme/sizes";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create<DashboardExtraStyles>({
  wrapper: {
    flex: layout.one,
    paddingVertical: spacing.md,
    backgroundColor: colors.byteBgDashboard,
    gap: spacing.md,
  },
  row: { flexDirection: layout.flexRow, gap: spacing.md },
  card: {
    flex: layout.one,
    backgroundColor: colors.byteColorWhite,
    padding: spacing.md,
    borderRadius: spacing.sm,
    minHeight: sizes.buttonMinWidth,
  },
  cardTitle: {
    fontWeight: typography.fontBold,
    marginBottom: 8,
    color: colors.byteColorDash,
  },
  cardValue: { fontSize: typography.textLg, fontWeight: typography.fontBold },
  balance: {
    flex: layout.one,
    backgroundColor: colors.byteColorDash2,
    padding: spacing.md,
    borderRadius: spacing.sm,
    minHeight: sizes.buttonMinWidth,
  },
  balanceLabel: {
    color: colors.byteColorBlue100,
    fontWeight: typography.fontBold,
  },
  balanceValue: {
    color: colors.byteColorWhite,
    fontSize: typography.textXl,
    fontWeight: typography.fontExtraBold,
    marginTop: spacing.sm,
  },
});
