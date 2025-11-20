import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

import { DefaultButton } from "@presentation/components/common/common/DefaultButton/DefaultButton";
import { useAuth } from "@presentation/state/AuthContext";
import { texts } from "@presentation/theme";
import { ROUTES } from "@shared/constants/routes";
import type { ForgotPasswordFormProps } from "@shared/ProfileStyles/profile.styles.types";
import { showToast } from "@shared/utils/transactions.utils";
import { validateEmail } from "@shared/utils/validation";
import { styles } from "./ForgotPasswordForm.styles";

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmitSuccess,
}) => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { resetPassword } = useAuth();

  const handleEmailChange = (text: string): void => {
    setEmail(text);
    setEmailError(validateEmail(text));
  };

  const handleSubmit = async (): Promise<void> => {
    const finalEmailError = validateEmail(email);
    setEmailError(finalEmailError);

    if (finalEmailError) {
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
      router.replace(ROUTES.LOGIN);
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

  const isButtonDisabled = !!emailError || !email || isLoading;

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
        onChangeText={handleEmailChange}
        style={[styles.input, emailError ? styles.inputError : null]}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        accessibilityLabel={texts.forgotPasswordForm.accessibility.emailInput}
      />
      {emailError ? (
        <Text style={styles.errorText} accessibilityLiveRegion="polite">
          {emailError}
        </Text>
      ) : null}

      <DefaultButton
        title={texts.forgotPasswordForm.buttons.submit}
        loading={isLoading}
        disabled={isButtonDisabled}
        onPress={() => void handleSubmit()} 
        buttonStyle={[styles.submit]}
        textStyle={styles.submitText}
        accessibilityLabel={texts.forgotPasswordForm.accessibility.submitButton}
        accessibilityHint={texts.forgotPasswordForm.accessibility.submitHint}
      />

      <DefaultButton
        title={texts.forgotPasswordForm.buttons.back}
        loading={false}
        disabled={false}
        onPress={() => router.push(ROUTES.LOGIN)}
        buttonStyle={styles.backButton}
        textStyle={styles.backText}
        accessibilityLabel={texts.forgotPasswordForm.accessibility.backButton}
      />
    </View>
  );
};