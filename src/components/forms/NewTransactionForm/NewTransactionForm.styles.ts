import { NewTransactionFormStyle } from "@/src/shared/ProfileStyles/profile.styles.types";
import { sharedStyles } from "@/src/styles/shared.styles";
import { border } from "@/src/theme/border";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import { radius } from "@/src/theme/radius";
import { shadows } from "@/src/theme/shadows";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create<NewTransactionFormStyle>({
  safeArea: {
    flex: layout.one,
    backgroundColor: colors.byteGray,
  },
  container: {
    flex: layout.one,
    backgroundColor: colors.byteGray,
  },
  keyboardAvoiding: {
    flex: layout.one, 
  },
  scrollContentContainer: {
    flexGrow: layout.one,
    justifyContent: typography.alignCenter,
    alignItems: layout.stretch,
    padding: spacing.ml,
  },
  title: {
    fontSize: typography.textXl,
    fontWeight: typography.fontBold,
    color: colors.byteGray700,
    marginBottom: spacing.xxl,
    textAlign: typography.alignCenter,
  },
  pickerContainer: {
    width: layout.widthFull,
    backgroundColor: colors.byteColorWhite,
    borderRadius: radius.sm,
    borderWidth: border.widthThin,
    borderColor: colors.byteGray300,
    marginBottom: spacing.ml,
    height: layout.height50,
    justifyContent: typography.alignCenter,
    zIndex: layout.zIndex1,
    elevation: layout.elevation1,
  },
  label: {
    fontSize: typography.textBase,
    color: colors.byteGray700,
    marginBottom: spacing.xs,
    alignSelf: typography.alignFlexStart,
  },
  input: {
    width: layout.widthFull,
    height: layout.height50,
    backgroundColor: colors.byteColorWhite,
    borderRadius: radius.sm,
    borderWidth: border.widthThin,
    borderColor: colors.byteGray300,
    paddingHorizontal: spacing.md,
    fontSize: typography.textBase,
    color: colors.byteGray700,
    textAlign: typography.alignCenter,
    marginBottom: spacing.ml,
  },
  submitButton: {
    backgroundColor: colors.byteColorDash,
    paddingVertical: spacing.md,
    borderRadius: radius.x1,
    width: layout.widthFull,
    alignItems: typography.alignCenter,
    elevation: layout.elevation,
    shadowColor: colors.byteColorBlack,
    shadowOffset: {
      width: shadows.shadowOffsetWidth,
      height: shadows.shadowOffsetHeight,
    },
    shadowOpacity: layout.opacitySm,
    shadowRadius: radius.mini,
    marginTop: spacing.sm,
  },
  submitButtonText: {
    color: colors.byteColorWhite,
    fontSize: typography.textBase,
    fontWeight: typography.fontBold,
  },
  cardPixelsTop: {
    ...sharedStyles.backgroundPixelsTop,
  },
  cardPixelsBotton: {
    ...sharedStyles.backgroundPixelsBottom,
  },
  illustration: {
    position: layout.positionAbsolute,
    opacity: layout.opacityLg,
    maxWidth: layout.width220,
    alignSelf: typography.alignCenter,
    zIndex: layout.zIndex2,
  },
  bottomIllustrationsContainer: {
    width: layout.widthFull,
    alignItems: typography.alignCenter,
    marginTop: spacing.xxl,
    minHeight: layout.minHeight,
  },
  dropdownPicker: {
    borderWidth: border.left0,
    elevation: layout.elevation0,
    shadowOpacity: layout.opacity0,
    backgroundColor: colors.byteColorWhite,
  },
});