import { StyleSheet } from "react-native";
import { ForgotPageStyles } from "../shared/ProfileStyles/profile.styles.types";
import { layout } from "../theme";
import { colors } from "../theme/colors";

export const styles = StyleSheet.create<ForgotPageStyles>({
  container: { 
    flex: layout.flex1, 
    backgroundColor: colors.byteBgDefault,
  },
});
