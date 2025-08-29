import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type Styles = {
  container: ViewStyle;
  header: ViewStyle;
  avatarCircle: ViewStyle;
  avatarText: TextStyle;
  userName: TextStyle;
  userEmail: TextStyle;
  scrollContent: ViewStyle;
  logoutButton: ViewStyle;
  logoutButtonText: TextStyle;
};

export const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: tokens.byteColorDash,
  },
  header: {
    paddingTop: tokens.spacingXl,
    paddingBottom: tokens.spacingLg,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: tokens.byteGray400,
  },
  avatarCircle: {
    width: tokens.avatarLg,
    height: tokens.avatarLg,
    borderRadius: tokens.avatarLg / 2,
    backgroundColor: tokens.byteColorGreen500,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: tokens.spacingMd,
  },
  avatarText: {
    color: tokens.byteColorWhite,
    fontSize: tokens.textMd,
    fontWeight: tokens.fontBold,
  },
  userName: {
    color: tokens.byteGray50,
    fontSize: tokens.textBase,
    fontWeight: tokens.fontSemibold,
    marginTop: tokens.spacingXs,
  },
  userEmail: {
    color: tokens.byteGray100,
    fontSize: tokens.textSm,
    marginTop: tokens.spacing2Xs,
  },
  scrollContent: {
    paddingTop: tokens.spacingSm,
  },
  logoutButton: {
    paddingVertical: tokens.spacingSm,
    marginTop: tokens.spacingMd,
    marginHorizontal: tokens.spacingSm,
    borderTopWidth: 1,
    borderTopColor: tokens.byteGray400,
  },
  logoutButtonText: {
    fontSize: tokens.textSm,
    color: tokens.byteGray100,
    fontWeight: tokens.fontSemibold,
    textAlign: "center",
  },
});
