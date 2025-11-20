import SignupIllustration from "@assets/images/cadastro/ilustracao-cadastro.svg";
import { DefaultButton } from "@presentation/components/common/common/DefaultButton/DefaultButton";
import { useAuth } from "@presentation/state/AuthContext";
import { colors, sizes, texts } from "@presentation/theme";
import { Checkbox } from "@shared/components/Checkbox/Checkbox";
import { ROUTES } from "@shared/constants/routes";
import type { SignupFormProps } from "@shared/ProfileStyles/profile.styles.types";
import { showToast } from "@shared/utils/transactions.utils";
import { validateEmail, validateName, validatePassword } from "@shared/utils/validation";
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
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();

  const validateConfirmPassword = (text: string): string => {
    if (text.length === 0) {
      // Assumindo que você tem uma mensagem para campo obrigatório em texts.formToasts.error
      // Caso não, usará a mensagem de mismatch se o campo for preenchido
      return validatePassword(text); 
    }
    if (text !== password) {
      return texts.signupForm.toasts.passwordMismatch.message;
    }
    return "";
  };

  const handleNameChange = (text: string): void => {
    setName(text);
    setNameError(validateName(text));
  };

  const handleEmailChange = (text: string): void => {
    setEmail(text);
    setEmailError(validateEmail(text));
  };

  const handlePasswordChange = (text: string): void => {
    setPassword(text);
    setPasswordError(validatePassword(text));
    setConfirmPasswordError(validateConfirmPassword(confirmPassword));
  };

  const handleConfirmPasswordChange = (text: string): void => {
    setConfirmPassword(text);
    setConfirmPasswordError(validateConfirmPassword(text));
  };

  const handleSubmit = async (): Promise<void> => {
    const { toasts } = texts.signupForm;
    
    // Roda a validação final em todos os campos para garantir que os estados de erro estejam atualizados
    const finalNameError = validateName(name);
    const finalEmailError = validateEmail(email);
    const finalPasswordError = validatePassword(password);
    const finalConfirmPasswordError = validateConfirmPassword(confirmPassword);
    
    setNameError(finalNameError);
    setEmailError(finalEmailError);
    setPasswordError(finalPasswordError);
    setConfirmPasswordError(finalConfirmPasswordError);

    // Checagem se há algum erro de validação
    if (finalNameError || finalEmailError || finalPasswordError || finalConfirmPasswordError) {
      showToast("error", toasts.emptyFields.title, toasts.emptyFields.message); // Reutilizando para erro de validação genérico
      return;
    }
    
    if (!isChecked) {
      showToast("error", toasts.termsNotAccepted.title, toasts.termsNotAccepted.message);
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
    !!nameError || !!emailError || !!passwordError || !!confirmPasswordError || !isChecked || isLoading;

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
            onChangeText={handleNameChange}
            style={[styles.input, nameError ? styles.inputError : null]}
            accessibilityLabel={texts.signupForm.fields.name}
          />
          {nameError ? (
            <Text style={styles.errorText} accessibilityLiveRegion="polite">
              {nameError}
            </Text>
          ) : null}

          <Text style={styles.label}>{texts.signupForm.fields.email}</Text>
          <TextInput
            placeholder={texts.signupForm.placeholders.email}
            value={email}
            onChangeText={handleEmailChange}
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
            onChangeText={handlePasswordChange}
            style={[styles.input, passwordError ? styles.inputError : null]}
            secureTextEntry
            accessibilityLabel={texts.signupForm.fields.password}
          />
          {passwordError ? (
            <Text style={styles.errorText} accessibilityLiveRegion="polite">
              {passwordError}
            </Text>
          ) : null}

          <Text style={styles.label}>{texts.signupForm.fields.confirmPassword}</Text>
          <TextInput
            placeholder={texts.signupForm.placeholders.confirmPassword}
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            style={[styles.input, confirmPasswordError ? styles.inputError : null]}
            secureTextEntry
            accessibilityLabel={texts.signupForm.fields.confirmPassword}
          />
          {confirmPasswordError ? (
            <Text style={styles.errorText} accessibilityLiveRegion="polite">
              {confirmPasswordError}
            </Text>
          ) : null}

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
            onPress={() => void handleSubmit()}
            buttonStyle={[styles.button, styles.submitButton]}
            textStyle={styles.buttonText}
            indicatorColor={colors.byteColorWhite}
            accessibilityLabel={texts.signupForm.buttons.submit}
            accessibilityHint={texts.signupForm.accessibility.submitHint}
          />

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