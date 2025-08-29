import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type InvestmentsScreenStyles = {
  container: ViewStyle;
  title: TextStyle;
};

export const styles = StyleSheet.create<InvestmentsScreenStyles>({
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
