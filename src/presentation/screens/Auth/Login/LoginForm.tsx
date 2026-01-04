import { DefaultButton } from "@/presentation/components/DefaultButton/DefaultButton";
import { texts } from "@/presentation/styles/theme";
import LoginIllustration from "@assets/images/login/ilustracao-login.svg";
import { useAuth } from "@presentation/state/AuthContext";
import { PasswordInput } from "@shared/components/PasswordInput/PasswordInput";
import { ROUTES } from "@shared/constants/routes";
import type { LoginFormProps } from "@shared/ProfileStyles/profile.styles.types";
import { showToast } from "@shared/utils/transactions.utils";
import { validateEmail, validatePassword } from "@shared/utils/validation";
import { Link, router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "./LoginForm.styles";

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { login } = useAuth();



  const handleEmailChange = useCallback((text: string): void => {
    setEmail(text);
    setEmailError(validateEmail(text));
  }, []);

  const handlePasswordChange = useCallback((text: string): void => {
    setPassword(text);
    setPasswordError(validatePassword(text));
  }, []);

  const handleLogin = useCallback(async (): Promise<void> => {
    const finalEmailError = validateEmail(email);
    const finalPasswordError = validatePassword(password);

    setEmailError(finalEmailError);
    setPasswordError(finalPasswordError);

    if (finalEmailError || finalPasswordError) {
      showToast(
        "error",
        texts.loginForm.toasts.emptyFields.title,
        texts.loginForm.toasts.emptyFields.message
      );
      return;
    }

    setIsLoading(true);

    try {
      await login({ email, password });
      onLoginSuccess?.(email);
    } catch (error: unknown) {
      console.error(error);
      
      let message = texts.loginForm.toasts.unexpectedError.message;
      
      if (error instanceof Error) {
        if ('userMessage' in error && typeof error.userMessage === 'string') {
          message = error.userMessage;
        } else {
          message = texts.loginForm.toasts.loginError.message;
        }
      }
      
      showToast("error", "Erro de Login", message);
    } finally {
      setIsLoading(false);
    }
  }, [email, password, login, onLoginSuccess]);

  const handleCreateAccount = useCallback((): void => {
    router.push(ROUTES.SIGNUP);
  }, []);

  const isFormValid = useMemo(() => {
    return !emailError && !passwordError && email && password && !isLoading;
  }, [emailError, passwordError, email, password, isLoading]);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.card}
        accessible
        accessibilityLabel={texts.loginForm.accessibility.form}
      >
        <LoginIllustration
          width="100%"
          style={styles.illustration}
          accessible
          accessibilityLabel={texts.loginForm.accessibility.illustration}
        />

        <Text style={styles.title} accessibilityRole="header">
          {texts.loginForm.title}
        </Text>

        <Text style={styles.label}>{texts.loginForm.labels.email}</Text>
        <TextInput
          placeholder={texts.loginForm.placeholders.email}
          value={email}
          onChangeText={handleEmailChange}
          style={[styles.input, emailError ? styles.inputError : null]}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel={texts.loginForm.accessibility.emailInput}
        />
        {emailError ? (
          <Text style={styles.errorText} accessibilityLiveRegion="polite">
            {emailError}
          </Text>
        ) : null}

        <Text style={styles.label}>{texts.loginForm.labels.password}</Text>
        <PasswordInput
          placeholder={texts.loginForm.placeholders.password}
          value={password}
          onChangeText={handlePasswordChange}
          error={passwordError}
          showLabel={false}
          accessibilityLabel={texts.loginForm.accessibility.passwordInput}
          accessibilityHint={texts.loginForm.accessibility.passwordHint}
        />


        <Link
          href={ROUTES.FORGOT_PASSWORD}
          accessibilityRole="link"
          accessibilityLabel={texts.loginForm.accessibility.forgotLink}
        >
          <Text style={styles.forgot}>{texts.loginForm.buttons.forgot}</Text>
        </Link>

        <View style={styles.alignButtons}>
          <DefaultButton
            title={texts.loginForm.buttons.submit}
            loading={isLoading}
            disabled={!isFormValid}
            onPress={() => {
              void handleLogin();
            }}
            buttonStyle={[styles.button, styles.submitButton]}
            textStyle={styles.buttonText}
            accessibilityLabel={texts.loginForm.accessibility.submitButton}
            accessibilityHint={texts.loginForm.accessibility.submitHint}
          />

          <DefaultButton
            title={texts.loginForm.buttons.create}
            loading={false}
            disabled={false}
            onPress={handleCreateAccount}
            buttonStyle={[styles.button, styles.createButton]}
            textStyle={styles.buttonText}
            accessibilityLabel={texts.loginForm.accessibility.createButton}
            accessibilityHint={texts.loginForm.accessibility.createHint}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
