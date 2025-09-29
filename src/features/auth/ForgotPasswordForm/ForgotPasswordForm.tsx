import { useAuth } from "@/src/contexts/AuthContext";
import { routes } from "@/src/routes";
import { ForgotPasswordFormProps } from "@/src/shared/ProfileStyles/profile.styles.types";
import { colors } from "@/src/theme/colors";
import { texts } from "@/src/theme/texts";
import { showToast } from "@/src/utils/transactions.utils";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles } from "./ForgotPasswordForm.styles";


export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmitSuccess,
}) => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async () => {
    if (!email) {
      showToast(
        "error",
        texts.forgotPasswordForm.toasts.emptyEmail.title,
        texts.forgotPasswordForm.toasts.emptyEmail.message
      );
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(email);
      showToast(
        "success",
        texts.forgotPasswordForm.toasts.success.title,
        texts.forgotPasswordForm.toasts.success.message
      );
      onSubmitSuccess?.(email);
      router.replace(routes.login);
    } catch (error: unknown) {
      console.error(error);
      const message =
        error instanceof Error
          ? error.message
          : texts.forgotPasswordForm.toasts.error.message;
      showToast(
        "error",
        texts.forgotPasswordForm.toasts.error.title,
        message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = !email || isLoading;

  return (
    <View
      style={styles.card}
      accessible
      accessibilityLabel={texts.forgotPasswordForm.accessibility.form}
    >
      <Text style={styles.title} accessibilityRole="header">
        {texts.forgotPasswordForm.title}
      </Text>

      <Text style={styles.label}>{texts.forgotPasswordForm.label}</Text>
      <TextInput
        placeholder={texts.forgotPasswordForm.placeholder}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        accessibilityLabel={texts.forgotPasswordForm.accessibility.emailInput}
      />

      <Pressable
        onPress={handleSubmit}
        style={[styles.submit, isButtonDisabled && styles.submitDisabled]}
        disabled={isButtonDisabled}
        accessibilityRole="button"
        accessibilityLabel={texts.forgotPasswordForm.accessibility.submitButton}
        accessibilityHint={texts.forgotPasswordForm.accessibility.submitHint}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.byteColorWhite} />
        ) : (
          <Text style={styles.submitText}>
            {texts.forgotPasswordForm.buttons.submit}
          </Text>
        )}
      </Pressable>

      <Pressable
        onPress={() => router.push(routes.login)}
        style={styles.backButton}
        accessibilityRole="button"
        accessibilityLabel={texts.forgotPasswordForm.accessibility.backButton}
      >
        <Text style={styles.backText}>
          {texts.forgotPasswordForm.buttons.back}
        </Text>
      </Pressable>
    </View>
  );
};
