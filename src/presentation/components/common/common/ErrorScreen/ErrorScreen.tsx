
import type { ErrorScreenProps } from "@shared/interfaces/auth.interfaces";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultButton } from "../DefaultButton/DefaultButton";
import { styles } from "./ErrorScreen.styles";

export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  title = "Ocorreu um erro",
  message = "Algo deu errado. Tente novamente.",
  onRetry,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        <DefaultButton
          title="Tente novamente"
          onPress={onRetry}
          accessibilityLabel="Tentar novamente"
          buttonStyle={styles.retryButton}
          textStyle={styles.retryButtonText}
        />
      </View>
    </SafeAreaView>
  );
};
