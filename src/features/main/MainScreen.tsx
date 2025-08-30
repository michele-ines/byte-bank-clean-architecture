import { Header } from "@/src/shared/Header/Header"; // importa o Header
import { tokens } from "@/src/theme/tokens";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const MainScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header global (com menu hambúrguer) */}
      <Header />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Experimente mais liberdade no controle da sua vida financeira.
          </Text>
          <Text style={styles.heroSubtitle}>Crie sua conta com a gente!</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © Bytebank - Desenvolvido por Aza
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.byteBgDefault },
  content: { padding: tokens.spacingMd, alignItems: "center" },
  hero: { alignItems: "center", marginBottom: tokens.spacingXl },
  heroTitle: {
    fontSize: tokens.textMd,
    fontWeight: tokens.fontSemibold,
    textAlign: "center",
    marginBottom: tokens.spacingXs,
    color: tokens.byteColorBlack,
  },
  heroSubtitle: {
    fontSize: tokens.textSm,
    textAlign: "center",
    marginBottom: tokens.spacingMd,
    color: tokens.byteTextMediumGray,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: tokens.byteGray200,
    paddingTop: tokens.spacingSm,
    marginTop: tokens.spacingMd,
    width: "100%",
  },
  footerText: {
    fontSize: tokens.textXs,
    textAlign: "center",
    color: tokens.byteTextMediumGray,
  },
});
