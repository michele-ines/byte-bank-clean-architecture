import { tokens } from "@/src/theme/tokens";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBg: {
    flex: 1,
  },
  innerContent: {
    paddingHorizontal: tokens.spacingMd,
    paddingBottom: tokens.spacingXl,
  },
  hero: {
    alignItems: "center",
    marginBottom: tokens.spacingXl,
  },
  heroTitle: {
    fontSize: tokens.textLg,
    fontWeight: tokens.fontBold,
    textAlign: "center",
    marginTop: tokens.spacingMl,
    marginBottom: tokens.spacingXs,
    color: tokens.byteColorBlack,
  },
  heroSubtitle: {
    fontSize: tokens.textMd,
    fontWeight: tokens.fontBold,
    textAlign: "center",
    marginBottom: tokens.spacingMd,
    color: tokens.byteColorGreen500,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: tokens.spacingMd,
    gap: tokens.spacingSm,
  },
  btn: {
    paddingVertical: tokens.spacingSm,
    paddingHorizontal: tokens.spacingLg,
    borderRadius: tokens.radiusMd,
    borderWidth: 1, 
  },
  btnPrimary: {
    backgroundColor: tokens.byteColorBlack,
    borderColor: tokens.byteColorBlack,
  },
  btnPrimaryText: {
    color: tokens.byteColorWhite,
    fontWeight: tokens.fontBold,
    textAlign: "center",
  },
  btnSecondary: {
    backgroundColor: "transparent", 
    borderColor: tokens.byteColorBlack,
  },
  btnSecondaryText: {
    color: tokens.byteColorBlack,
    fontWeight: tokens.fontBold,
    textAlign: "center",
  },
  section: {
    marginBottom: tokens.spacingXl,
  },
  sectionTitle: {
    fontSize: tokens.textMd,
    fontWeight: tokens.fontBold,
    textAlign: "center",
    marginBottom: tokens.spacingLg,
    color: tokens.byteColorBlack,
  },
  card: {
    alignItems: "center",
    marginBottom: tokens.spacingLg,
    paddingHorizontal: tokens.spacingMd,
  },
  cardTitle: {
    fontSize: tokens.textLg,
    fontWeight: tokens.fontSemibold,
    textAlign: "center",
    marginTop: tokens.spacingXs,
    marginBottom: tokens.spacing2Xs,
    color: tokens.byteColorGreen500,
  },
  cardDescription: {
    fontSize: tokens.textBase,
    textAlign: "center",
    color: tokens.byteTextMediumGray,
    lineHeight: tokens.lineHeightRelaxed,
  },
});
