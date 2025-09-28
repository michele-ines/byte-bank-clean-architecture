import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import { spacing } from "@/src/theme/spacing";
import { texts } from "@/src/theme/texts";
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
      accessibilityLabel={texts.a11yFinancialChart}
    >
      <Text style={styles.title}>{texts.textFinancialChart}</Text>

      <LineChart
        data={texts.financialChartData}
        width={Dimensions.get("window").width - spacing.xl}
        height={layout.chartHeight}
        yAxisLabel={texts.currencyPrefix}
        chartConfig={{
          backgroundGradientFrom: colors.byteColorWhite,
          backgroundGradientTo: colors.byteColorWhite,
          color: () => colors.byteColorGreen500,
          labelColor: () => colors.byteGray700,
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}
