import { tokens } from "@/src/theme/tokens";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { styles } from "./FinancialChart.styles";

export default function FinancialChart() {
  return (
    <View
      style={styles.container}
      accessible
      accessibilityRole="summary"
      accessibilityLabel={tokens.a11yFinancialChart}
    >
      <Text style={styles.title}>{tokens.textFinancialChart}</Text>

      <LineChart
        data={tokens.financialChartData} 
        width={Dimensions.get("window").width - tokens.spacingXl}
        height={tokens.chartHeight}
        yAxisLabel={tokens.currencyPrefix}
        chartConfig={{
          backgroundGradientFrom: tokens.byteColorWhite,
          backgroundGradientTo: tokens.byteColorWhite,
          color: () => tokens.byteColorGreen500,
          labelColor: () => tokens.byteGray700, 
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}
