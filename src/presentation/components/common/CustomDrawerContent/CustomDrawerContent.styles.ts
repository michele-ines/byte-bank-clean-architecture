
import { colors, sizes, spacing, typography } from "@presentation/theme";
import { ProfileStyles } from "@shared/ProfileStyles/profile.styles.types";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create<ProfileStyles>({
  container: {
    flex: 1,
    backgroundColor: colors.byteColorDash,
  },
  header: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    alignItems: typography.alignCenter,
    borderBottomWidth: 1,
    borderBottomColor: colors.byteGray400,
  },
  avatarCircle: {
    width: sizes.avatarLg,
    height: sizes.avatarLg,
    borderRadius: sizes.avatarLg / 2,
    backgroundColor: colors.byteColorGreen500,
    alignItems: typography.alignCenter,
    justifyContent: typography.alignCenter,
    marginBottom: spacing.md,
  },
  avatarText: {
    color: colors.byteColorWhite,
    fontSize: typography.textMd,
    fontWeight: typography.fontBold,
  },
  userName: {
    color: colors.byteGray50,
    fontSize: typography.textBase,
    fontWeight: typography.fontSemibold,
    marginTop: spacing.xs,
  },
  userEmail: {
    color: colors.byteGray100,
    fontSize: typography.textSm,
    marginTop: spacing.xs2,
  },
  scrollContent: {
    paddingTop: spacing.sm,
  },
  logoutButton: {
    paddingVertical: spacing.sm,
    marginTop: spacing.md,
    marginHorizontal: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.byteGray400,
  },
  logoutButtonText: {
    fontSize: typography.textSm,
    color: colors.byteGray100,
    fontWeight: typography.fontSemibold,
    textAlign: typography.textAlignCenter,
  },
});
