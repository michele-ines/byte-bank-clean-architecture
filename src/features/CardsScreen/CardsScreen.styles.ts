import { tokens } from "@/src/theme/tokens";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: tokens.flex1,
    backgroundColor: tokens.byteBgDefault,
    padding: tokens.spacingLg,
  },
  contentContainer: {
    paddingBottom: tokens.contentPaddingBottom, // 👈 novo token
  },
  headerWrapper: {
    gap: tokens.spacingXs,
  },
  title: {
    fontSize: tokens.textXl,
    fontWeight: tokens.fontBold,
    color: tokens.byteColorBlack,
    textAlign: tokens.textAlignCenter,
  },
  subtitle: {
    fontSize: tokens.textSm,
    color: tokens.byteTextMediumGray,
    textAlign: tokens.textAlignCenter,
    marginBottom: tokens.spacingMd,
  },
});
