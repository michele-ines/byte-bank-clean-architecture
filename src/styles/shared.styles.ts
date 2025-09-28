import { StyleSheet } from "react-native";
import { SharedStyles } from "../shared/ProfileStyles/profile.styles.types";
import { border } from "../theme/border";
import { colors } from "../theme/colors";
import { layout } from "../theme/layout";
import { radius } from "../theme/radius";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";


export const sharedStyles = StyleSheet.create<SharedStyles>({
  keyboardView: {
    flex: layout.one,
  },
  scrollView: {
    flex: layout.one,
    backgroundColor: colors.byteBgDefault,
  },
  scrollViewContent: {
    flexGrow: layout.one,
  },
  formContainer: {
    flex: layout.one,
    justifyContent: typography.alignCenter,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.textXl,
    fontWeight: typography.fontBold,
    textAlign: typography.alignCenter,
    color: colors.byteGray800,
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.textBase,
    fontWeight: typography.fontSemibold,
    color: colors.byteGray700,
    marginBottom: spacing.xs2,
  },
  input: {
    borderWidth: border.widthThin,
    borderColor: colors.byteGray300,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    fontSize: typography.textBase,
    backgroundColor: colors.byteGray50,
    color: colors.byteGray800,
  },
  // Botões
  button: {
    paddingVertical:spacing.md, 
    borderRadius: radius.sm,
    alignItems: typography.alignCenter,
    marginTop: spacing.xs,
    width: layout.width150,
  },
  buttonText: {
    color: colors.byteColorWhite,
    fontWeight: typography.fontBold,
    fontSize: typography.textBase,
  },
  buttonDisabled: {
    backgroundColor: colors.byteGray400,
  },
  backgroundPixelsTop : {
    position: layout.positionAbsolute,
    top: layout.width0,
    left: layout.width0,
    width: layout.width90Percent,
    height: layout.widthFull,
    opacity: layout.opacityImage, 
  },
  backgroundPixelsBottom: {
    position: layout.positionAbsolute,
    bottom: layout.width0,
    right: layout.width0,
    width: layout.width45Percent, 
    height: layout.height50Percent, 
    opacity: layout.opacityImage, 
  },
});
