import { sharedStyles } from "@/src/styles/shared.styles";
import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type CardMinhaContaStyles = {
  title: TextStyle;
  field: ViewStyle;
  label: TextStyle;
  inputWrapper: ViewStyle;
  input: TextStyle;
  inputEditing: ViewStyle;
  icon: TextStyle;
};
export const styles = StyleSheet.create<CardMinhaContaStyles>({
  title: {
    ...sharedStyles.title,
  },
  field: {
    marginBottom: tokens.spacing2Sm,
  },
  label: {
    ...sharedStyles.label,
  },
  inputWrapper: {
    flexDirection: tokens.flexRow,
    alignItems: tokens.alignCenter,
    borderWidth: tokens.borderWidthThin,
    borderColor: tokens.byteGray300,
    borderRadius: tokens.radiusSm,
    backgroundColor: tokens.byteBgDefault,
    paddingHorizontal: tokens.spacing2Sm,
  },
  input: {
    flex: tokens.flex1,
    height: tokens.buttonHeight,
    fontSize: tokens.textBase,
    color: tokens.byteTextMediumGray,
  },
  inputEditing: {
    borderColor: tokens.byteColorGreen500,
  },
  icon: {
    fontSize: tokens.width20,
  },
});
