
import { colors, typography } from "@presentation/theme";
import React from "react";
import type { ViewStyle } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import type { CardProps } from "../ProfileStyles/profile.styles.types";

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
    backgroundColor: colors.byteBgDefault,
  },
  elevated: {
    shadowColor: colors.byteGray900,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  } as ViewStyle,
  outlined: {
    borderWidth: 1,
    borderColor: colors.byteGray200,
  } as ViewStyle,
  title: {
    fontSize: typography.textMd,
    fontWeight: "700",
    color: colors.byteGray800,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: typography.textSm,
    color: colors.byteGray500,
    marginBottom: 12,
  },
  content: {
    marginTop: 4,
  },
});
