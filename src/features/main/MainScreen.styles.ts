import { tokens } from "@/src/theme/tokens";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBg: {
    flex: 1,
  },
  content: {
    padding: tokens.spacingMd,
    flexGrow: 1,
  },
  hero: {
    alignItems: "center",
    marginBottom: tokens.spacingXl,
  },
  heroTitle: {
    fontSize: tokens.textLg,
    fontWeight: tokens.fontBold,
    textAlign: "center",
    marginBottom: tokens.spacingXs,
    color: tokens.byteColorBlack,
  },
  heroSubtitle: {
    fontSize: 18, // ✅ tamanho fixo (px)
    fontWeight: tokens.fontBold, // ✅ negrito
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
  },
  btnPrimary: {
    backgroundColor: tokens.byteColorGreen500,
  },
  btnPrimaryText: {
    color: tokens.byteColorWhite,
    fontWeight: tokens.fontBold,
  },
  btnSecondary: {
    backgroundColor: tokens.byteColorBlack,
  },
  btnSecondaryText: {
    color: tokens.byteColorWhite,
    fontWeight: tokens.fontBold,
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
    fontSize: tokens.textSm,
    fontWeight: tokens.fontSemibold,
    textAlign: "center",
    marginTop: tokens.spacingXs,
    marginBottom: tokens.spacing2Xs,
    color: tokens.byteColorGreen500, // ✅ título verde
  },
  cardDescription: {
    fontSize: tokens.textXs,
    textAlign: "center",
    color: tokens.byteTextMediumGray,
    lineHeight: tokens.lineHeightRelaxed, // ✅ melhor legibilidade
  },
});
