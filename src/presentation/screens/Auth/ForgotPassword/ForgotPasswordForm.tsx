
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

import { DefaultButton } from "@presentation/components/common/common/DefaultButton/DefaultButton";
import { useAuth } from "@presentation/state/AuthContext";
import { texts } from "@presentation/theme";
import { routes } from "@shared/constants/routes";
import { ForgotPasswordFormProps } from "@shared/ProfileStyles/profile.styles.types";
import { showToast } from "@shared/utils/transactions.utils";
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
      showToast("error", texts.forgotPasswordForm.toasts.error.title, message);
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

      <DefaultButton
        title={texts.forgotPasswordForm.buttons.submit}
        loading={isLoading}
        disabled={isButtonDisabled}
        onPress={handleSubmit}
        buttonStyle={[styles.submit]}
        textStyle={styles.submitText}
        accessibilityLabel={texts.forgotPasswordForm.accessibility.submitButton}
        accessibilityHint={texts.forgotPasswordForm.accessibility.submitHint}
      />

      <DefaultButton
        title={texts.forgotPasswordForm.buttons.back}
        loading={false}
        disabled={false}
        onPress={() => router.push(routes.login)}
        buttonStyle={styles.backButton}
        textStyle={styles.backText}
        accessibilityLabel={texts.forgotPasswordForm.accessibility.backButton}
      />
    </View>
  );
};
