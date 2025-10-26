
import { colors } from "@presentation/theme";
import { InvestmentsScreenStyles } from "@shared/ProfileStyles/profile.styles.types";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create<InvestmentsScreenStyles>({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: colors.byteBgDashboard 
  },
  title: { 
    fontSize: 20, 
    fontWeight: "700" 
  },
});
