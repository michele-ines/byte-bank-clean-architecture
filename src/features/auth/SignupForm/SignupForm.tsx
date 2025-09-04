import SignupIllustration from "@/assets/images/cadastro/ilustracao-cadastro.svg";
import { useAuth } from "@/src/contexts/AuthContext";
import { routes } from "@/src/routes";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { tokens } from "@/src/theme/tokens";
import { ToastType } from "@/src/types/types";
import ExpoCheckbox from "expo-checkbox";
import Toast from "react-native-toast-message";
import { styles } from "./SignupForm.styles";

const signupFormTexts = {
  title: "Preencha os campos para criar sua conta!",
  fields: {
    name: "Nome",
    email: "Email",
    password: "Senha",
    confirmPassword: "Confirmar Senha",
  },
  placeholders: {
    name: "Digite seu nome completo",
    email: "Digite seu email",
    password: "Mínimo 8 caracteres",
    confirmPassword: "Confirme sua senha",
  },
  checkboxLabel:
    "Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco.",
  buttons: {
    submit: "CRIAR CONTA",
    back: "VOLTAR AO LOGIN",
  },
  accessibility: {
    form: "Formulário de cadastro de conta corrente",
    illustration: "Ilustração de uma pessoa interagindo com um ecrã de portátil seguro.",
    checkbox: "Checkbox para aceitar os termos de privacidade.",
    submitHint: "Cria uma nova conta e redireciona para o dashboard.",
    backHint: "Volta para a tela de login sem salvar as alterações.",
  },
  toasts: {
    emptyFields: { title: "Atenção", message: "Por favor, preencha todos os campos." },
    passwordMismatch: { title: "Atenção", message: "As senhas não coincidem." },
    passwordWeak: { title: "Senha Fraca", message: "A senha deve ter no mínimo 8 caracteres." },
    termsNotAccepted: { title: "Atenção", message: "Você precisa aceitar os termos e condições." },
    emailInvalid: { title: "Atenção", message: "Por favor, corrija o email antes de continuar." },
    success: { title: "Sucesso!", message: "Conta criada. Você será redirecionado." },
    emailInUse: { title: "Erro", message: "Este e-mail já está em uso." },
    genericError: { title: "Erro", message: "Ocorreu um erro ao criar a conta." },
  },
};

const showToast = (type: ToastType, text1: string, text2: string) => {
  Toast.show({ type, text1, text2 });
};

type SignupFormProps = {
  onSignupSuccess?: (email: string) => void;
};

export const SignupForm: React.FC<SignupFormProps> = ({ onSignupSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();

  const validateEmail = (text: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(text) && text.length > 0) {
      setEmailError("Dado incorreto. Revise e digite novamente.");
    } else {
      setEmailError("");
    }
    setEmail(text);
  };

  const handleSubmit = async () => {
    const { toasts } = signupFormTexts;
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
      await signup(email, password, name);
      onSignupSuccess?.(email);
      showToast("success", toasts.success.title, toasts.success.message);
      router.replace(routes.dashboard);
    } catch (error: unknown) {
      let errorMessage = toasts.genericError.message;
      let errorTitle = toasts.genericError.title;

      if (error instanceof Error && (error as any).code === "auth/email-already-in-use") {
        errorMessage = toasts.emailInUse.message;
        errorTitle = toasts.emailInUse.title;
      }
      showToast("error", errorTitle, errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormInvalid = !name || !email || !password || !confirmPassword || !isChecked || isLoading;

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
          accessibilityLabel={signupFormTexts.accessibility.form}
        >
          <SignupIllustration
            width="100%"
            height={tokens.illustrationSignupHeight}
            style={styles.illustration}
            accessibilityLabel={signupFormTexts.accessibility.illustration}
          />

          <Text style={styles.title} accessibilityRole="header">{signupFormTexts.title}</Text>

          {/* Nome */}
          <Text style={styles.label}>{signupFormTexts.fields.name}</Text>
          <TextInput
            placeholder={signupFormTexts.placeholders.name}
            value={name}
            onChangeText={setName}
            style={styles.input}
            accessibilityLabel={signupFormTexts.fields.name}
          />

          {/* Email */}
          <Text style={styles.label}>{signupFormTexts.fields.email}</Text>
          <TextInput
            placeholder={signupFormTexts.placeholders.email}
            value={email}
            onChangeText={validateEmail}
            style={[styles.input, emailError ? styles.inputError : null]}
            keyboardType="email-address"
            autoCapitalize="none"
            accessibilityLabel={signupFormTexts.fields.email}
          />
          {emailError ? <Text style={styles.errorText} accessibilityLiveRegion="polite">{emailError}</Text> : null}

          {/* Senha */}
          <Text style={styles.label}>{signupFormTexts.fields.password}</Text>
          <TextInput
            placeholder={signupFormTexts.placeholders.password}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            accessibilityLabel={signupFormTexts.fields.password}
          />

          {/* Confirmar Senha */}
          <Text style={styles.label}>{signupFormTexts.fields.confirmPassword}</Text>
          <TextInput
            placeholder={signupFormTexts.placeholders.confirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
            secureTextEntry
            accessibilityLabel={signupFormTexts.fields.confirmPassword}
          />

          {/* Checkbox */}
          <View style={styles.checkboxContainer}>
            <ExpoCheckbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? tokens.byteColorGreen500 : undefined}
              accessibilityRole="checkbox"
              accessibilityLabel={signupFormTexts.accessibility.checkbox}
              accessibilityState={{ checked: isChecked }}
            />
            <Text style={styles.checkboxLabel}>{signupFormTexts.checkboxLabel}</Text>
          </View>

          {/* Botão Criar conta */}
          <Pressable
            onPress={handleSubmit}
            style={[styles.button, styles.submitButton, isFormInvalid && styles.submitButtonDisabled]}
            disabled={isFormInvalid}
            accessibilityRole="button"
            accessibilityLabel={signupFormTexts.buttons.submit}
            accessibilityHint={signupFormTexts.accessibility.submitHint}
          >
            {isLoading ? (
              <ActivityIndicator color={tokens.byteColorWhite} />
            ) : (
              <Text style={styles.buttonText}>{signupFormTexts.buttons.submit}</Text>
            )}
          </Pressable>

          {/* Botão Voltar */}
          <Pressable
            onPress={() => router.push(routes.login)}
            style={[styles.button, styles.backButton]}
            accessibilityRole="button"
            accessibilityLabel={signupFormTexts.buttons.back}
            accessibilityHint={signupFormTexts.accessibility.backHint}
          >
            <Text style={styles.backText}>{signupFormTexts.buttons.back}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

