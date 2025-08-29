import { tokens } from "@/src/theme/tokens";
import React, { ReactNode } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

type CardProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  variant?: "elevated" | "outlined"; // variações
};

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  variant = "elevated",
}) => {
  return (
    <View
      style={[
        styles.card,
        variant === "elevated" ? styles.elevated : styles.outlined,
      ]}
    >
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 12,
    padding: 16,
    backgroundColor: tokens.byteBgDefault,
  },
  elevated: {
    shadowColor: tokens.byteGray900,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  } as ViewStyle,
  outlined: {
    borderWidth: 1,
    borderColor: tokens.byteGray200,
  } as ViewStyle,
  title: {
    fontSize: tokens.textMd,
    fontWeight: "700",
    color: tokens.byteGray800,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: tokens.textSm,
    color: tokens.byteGray500,
    marginBottom: 12,
  },
  content: {
    marginTop: 4,
  },
});
