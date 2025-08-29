import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { tokens } from "../../theme/tokens";

export const Footer: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.col}>
        <Text style={styles.title}>Serviços</Text>
        <Text style={styles.link}>Conta corrente</Text>
        <Text style={styles.link}>Conta PJ</Text>
        <Text style={styles.link}>Cartão de crédito</Text>
      </View>
      <View style={styles.col}>
        <Text style={styles.title}>Contato</Text>
        <Text style={styles.link}>0800 504 3058</Text>
        <Text style={styles.link}>suporte@bytebank.com</Text>
        <Text style={styles.link}>contato@bytebank.com</Text>
      </View>
      <View style={styles.col}>
        <Text style={styles.title}>Developed by Front‑End</Text>
        <Text style={styles.link}>@Bytebank</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: tokens.byteColorDash,
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 24,
  },
  col: { gap: 6 },
  title: { color: "#fff", fontWeight: "700", marginBottom: 6 },
  link: { color: "#fff" },
});