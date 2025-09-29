import { ErrorScreenProps } from "@/src/shared/interfaces/auth.interfaces";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

        <Pressable style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>Tente novamente</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
