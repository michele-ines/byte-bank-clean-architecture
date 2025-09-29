import CardPixelsTop from "@/assets/images/dash-card-new-transacao/card-pixels-3.svg";
import React from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { texts } from "@/src/theme";
import { DonutChart } from "../../DonutChart/DonutChart";
import { styles } from "./InvestmentSummaryCard.styles";
import { investmentSummaryMock } from "./Mock/InvestmentSummaryCard.mock";

const investmentTexts = texts.investmentSummary;

export const InvestmentSummaryCard: React.FC = () => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <View style={styles.container}>
      <CardPixelsTop
        style={styles.cardPixelsTop}
        accessible
        accessibilityLabel={investmentTexts.accessibility.cardTopIllustration}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        accessibilityLabel={investmentTexts.accessibility.container}
      >
        <Text style={styles.headerTitle} accessibilityRole="header">
          {investmentTexts.title}
        </Text>

        <Text style={styles.totalValue}>
          {investmentTexts.totalLabel}{" "}
          {formatCurrency(investmentSummaryMock.total)}
        </Text>

        <View style={styles.summaryContainer}>
          <View
            style={styles.summaryCard}
            accessibilityLabel={investmentTexts.accessibility.fixedIncomeCard}
          >
            <Text style={styles.summaryCardTitle}>
              {investmentTexts.fixedIncomeLabel}
            </Text>
            <Text style={styles.summaryCardValue}>
              {formatCurrency(investmentSummaryMock.fixedIncome)}
            </Text>
          </View>

          <View
            style={styles.summaryCard}
            accessibilityLabel={
              investmentTexts.accessibility.variableIncomeCard
            }
          >
            <Text style={styles.summaryCardTitle}>
              {investmentTexts.variableIncomeLabel}
            </Text>
            <Text style={styles.summaryCardValue}>
              {formatCurrency(investmentSummaryMock.variableIncome)}
            </Text>
          </View>
        </View>

        <Text style={styles.statsTitle}>{investmentTexts.statsTitle}</Text>

        <View style={styles.statsCard}>
          <DonutChart
            data={investmentSummaryMock.portfolio}
            accessibilityLabel={investmentTexts.accessibility.donutChart}
          />

          <View
            style={styles.legendContainer}
            accessibilityLabel={investmentTexts.accessibility.legend}
          >
            {investmentSummaryMock.portfolio.map((item) => (
              <View key={item.name} style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: item.color }]}
                />
                <Text style={styles.legendText}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
