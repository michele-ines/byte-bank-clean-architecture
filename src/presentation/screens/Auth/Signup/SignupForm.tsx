import SignupIllustration from "@assets/images/cadastro/ilustracao-cadastro.svg";
import { DefaultButton } from "@presentation/components/common/common/DefaultButton/DefaultButton";
import { useAuth } from "@presentation/state/AuthContext";
import { colors, sizes, texts } from "@presentation/theme";
import { Checkbox } from "@shared/components/Checkbox/Checkbox";
import { ROUTES } from "@shared/constants/routes";
import type { SignupFormProps } from "@shared/ProfileStyles/profile.styles.types";
import { showToast } from "@shared/utils/transactions.utils";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles } from "./SignupForm.styles";

export const SignupForm: React.FC<SignupFormProps> = ({ onSignupSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();

  // ✅ Adicionado tipo de retorno explícito: void
  const validateEmail = (text: string): void => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(text) && text.length > 0) {
      setEmailError("Dado incorreto. Revise e digite novamente.");
    } else {
      setEmailError("");
    }
    setEmail(text);
  };

  // ✅ Adicionado tipo de retorno explícito: Promise<void>
  const handleSubmit = async (): Promise<void> => {
    const { toasts } = texts.signupForm;
    if (!name || !email || !password || !confirmPassword) {
      showToast("error", toasts.emptyFields.title, toasts.emptyFields.message);
      return;
    }
    if (password.length < 8) {
      showToast("error", toasts.passwordWeak.title, toasts.passwordWeak.message);
      return;
    }
    if (password !== confirmPassword) {
      showToast("error", toasts.passwordMismatch.title, toasts.passwordMismatch.message);
      return;
    }
    if (!isChecked) {
      showToast("error", toasts.termsNotAccepted.title, toasts.termsNotAccepted.message);
      return;
    }
    if (emailError) {
      showToast("error", toasts.emailInvalid.title, toasts.emailInvalid.message);
      return;
    }

    setIsLoading(true);
   try {
        await signup({ email, password, name });
        onSignupSuccess?.(email);
        showToast("success", toasts.success.title, toasts.success.message);
    } catch (error: unknown) {
      let errorMessage = toasts.genericError.message;
      let errorTitle = toasts.genericError.title;

      // ✅ Tipagem de erro aprimorada
      if (
        error instanceof Error &&
        (error as { code?: string }).code === "auth/email-already-in-use"
      ) {
        errorMessage = toasts.emailInUse.message;
        errorTitle = toasts.emailInUse.title;
      }
      showToast("error", errorTitle, errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormInvalid =
    !name || !email || !password || !confirmPassword || !isChecked || isLoading;

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={styles.card}
          accessible
          accessibilityLabel={texts.signupForm.accessibility.form}
        >
          <SignupIllustration
            width="100%"
            height={sizes.illustrationSignupHeight}
            style={styles.illustration}
            accessibilityLabel={texts.signupForm.accessibility.illustration}
          />

          <Text style={styles.title} accessibilityRole="header">
            {texts.signupForm.title}
          </Text>

          <Text style={styles.label}>{texts.signupForm.fields.name}</Text>
          <TextInput
            placeholder={texts.signupForm.placeholders.name}
            value={name}
            onChangeText={setName}
            style={styles.input}
            accessibilityLabel={texts.signupForm.fields.name}
          />

          <Text style={styles.label}>{texts.signupForm.fields.email}</Text>
          <TextInput
            placeholder={texts.signupForm.placeholders.email}
            value={email}
            onChangeText={validateEmail}
            style={[styles.input, emailError ? styles.inputError : null]}
            keyboardType="email-address"
            autoCapitalize="none"
            accessibilityLabel={texts.signupForm.fields.email}
          />
          {emailError ? (
            <Text style={styles.errorText} accessibilityLiveRegion="polite">
              {emailError}
            </Text>
          ) : null}

          <Text style={styles.label}>{texts.signupForm.fields.password}</Text>
          <TextInput
            placeholder={texts.signupForm.placeholders.password}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            accessibilityLabel={texts.signupForm.fields.password}
          />

          {/* Confirmar Senha */}
          <Text style={styles.label}>{texts.signupForm.fields.confirmPassword}</Text>
          <TextInput
            placeholder={texts.signupForm.placeholders.confirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
            secureTextEntry
            accessibilityLabel={texts.signupForm.fields.confirmPassword}
          />

          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? colors.byteColorGreen500 : undefined}
              accessibilityRole="checkbox"
              accessibilityLabel={texts.signupForm.accessibility.checkbox}
              accessibilityState={{ checked: isChecked }}
            />
            <Text style={styles.checkboxLabel}>
              {texts.signupForm.checkboxLabel}
            </Text>
          </View>

          <DefaultButton
            title={texts.signupForm.buttons.submit}
            loading={isLoading}
            disabled={isFormInvalid}
            // ✅ Corrigido para evitar no-misused-promises
            onPress={() => void handleSubmit()}
            buttonStyle={[styles.button, styles.submitButton]}
            textStyle={styles.buttonText}
            indicatorColor={colors.byteColorWhite}
            accessibilityLabel={texts.signupForm.buttons.submit}
            accessibilityHint={texts.signupForm.accessibility.submitHint}
          />

          {/* Botão Voltar */}
          <DefaultButton
            title={texts.signupForm.buttons.back}
            loading={false}
            disabled={false}
            onPress={() => router.push(ROUTES.HOME)}
            buttonStyle={[styles.button, styles.backButton]}
            textStyle={styles.backText}
            indicatorColor={colors.byteColorWhite}
            accessibilityLabel={texts.signupForm.buttons.back}
            accessibilityHint={texts.signupForm.accessibility.backHint}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
