import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type CardsScreenStyles = {
  container: ViewStyle;
  title: TextStyle;
};

export const styles = StyleSheet.create<CardsScreenStyles>({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: tokens.byteBgDashboard 
  },
  title: { 
    fontSize: 20, 
    fontWeight: "700" 
  },
});
