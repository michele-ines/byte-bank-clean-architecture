import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const data = {
  labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
  datasets: [{ data: [1200, 2100, 800, 1600, 900, 1700] }],
};

export default function FinancialChart() {
  return (
    <View style={styles.container} accessible accessibilityLabel="Gráfico financeiro de janeiro a junho">
      <Text style={styles.title}>Gráfico Financeiro</Text>
      <LineChart
        data={data}
        width={Dimensions.get("window").width - 40}
        height={220}
        yAxisLabel="R$"
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: () => "#00C853",
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 20, alignItems: "center" },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  chart: { borderRadius: 12 },
});
