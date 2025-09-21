import CardPixelsTop from "@/assets/images/dash-card-new-transacao/card-pixels-3.svg";
import { tokens } from "@/src/theme/tokens";
import React from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DonutChart } from "../DonutChart/DonutChart";
import { investmentSummaryTexts } from "./InvestmentSumaryCard.texts";
import { styles } from "./InvestmentSummaryCard.styles";

const t = investmentSummaryTexts;
const mockData = {
  total: t.legenda.total,
  fixedIncome: t.legenda.fixedIncome,
  variableIncome: t.legenda.variableIncome,
  portfolio: [
    { name: t.legenda.fundoInvesimentos.text, value: t.legenda.fundoInvesimentos.value, color: tokens.byteColorBlue500 },
    { name: t.legenda.tesouroDireto.text, value: t.legenda.tesouroDireto.value, color: tokens.byteColorPurple500 },
    { name: t.legenda.previdenciaPrivada.text, value: t.legenda.previdenciaPrivada.value, color: tokens.byteColorOrange300 },
    { name: t.legenda.bolsaValores.text, value: t.legenda.bolsaValores.value, color: tokens.byteColorMagenta500 },
  ],
};

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
        accessibilityLabel={t.accessibility.cardTopIllustration}
      />
       <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        accessibilityLabel={t.accessibility.container}
      >
      <Text
        style={styles.headerTitle}
        accessibilityRole="header"
      >
        {t.title}
      </Text>

      <Text style={styles.totalValue}>
        {t.totalLabel} {formatCurrency(mockData.total)}
      </Text>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard} accessibilityLabel={t.accessibility.fixedIncomeCard}>
          <Text style={styles.summaryCardTitle}>{t.fixedIncomeLabel}</Text>
          <Text style={styles.summaryCardValue}>
            {formatCurrency(mockData.fixedIncome)}
          </Text>
        </View>

        <View style={styles.summaryCard} accessibilityLabel={t.accessibility.variableIncomeCard}>
          <Text style={styles.summaryCardTitle}>{t.variableIncomeLabel}</Text>
          <Text style={styles.summaryCardValue}>
            {formatCurrency(mockData.variableIncome)}
          </Text>
        </View>
      </View>

      <Text style={styles.statsTitle}>{t.statsTitle}</Text>

      <View style={styles.statsCard}>
        <DonutChart
          data={mockData.portfolio}
          accessibilityLabel={t.accessibility.donutChart}
        />

        <View
          style={styles.legendContainer}
          accessibilityLabel={t.accessibility.legend}
        >
          {mockData.portfolio.map((item) => (
            <View key={item.name} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
      </ScrollView>
    </View>
  );
};