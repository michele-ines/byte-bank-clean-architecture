import LoginIllustration from "@/assets/images/login/ilustracao-login.svg";
import { useAuth } from "@/src/contexts/AuthContext";
import { routes } from "@/src/routes";
import { tokens } from "@/src/theme/tokens";
import { ToastType } from "@/src/types/types";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { styles } from "./LoginForm.styles";

const formTexts = {
  title: "Login",
  labels: {
    email: "Email",
    password: "Senha",
  },
  placeholders: {
    email: "Digite seu email",
    password: "Digite sua senha",
  },
  buttons: {
    submit: "ACESSAR",
    create: "CRIAR CONTA",
    forgot: "Esqueci a Senha!",
  },
  accessibility: {
    form: "Formulário de login",
    illustration: "Ilustração de uma pessoa interagindo com um celular gigante para fazer login.",
    emailInput: "Campo de entrada de email",
    passwordInput: "Campo de entrada de senha",
    passwordHint: "A senha será escondida por segurança",
    forgotLink: "Esqueci a senha! Toque para recuperar.",
    submitButton: "Acessar conta",
    submitHint: "Faz login na sua conta com as credenciais inseridas",
    createButton: "Criar nova conta",
    createHint: "Navega para a tela de criação de conta",
  },
  toasts: {
    emptyFields: { title: "Atenção", message: "Informe e-mail e senha." },
    loginError: { title: "Erro de Login", message: "Email ou senha inválidos." },
    unexpectedError: { title: "Erro", message: "Ocorreu um erro inesperado." },
  },
};



type LoginFormProps = {
  onLoginSuccess?: (email: string) => void;
};

const showToast = (type: ToastType, text1: string, text2: string) => {
  Toast.show({ type, text1, text2 });
};

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      showToast("error", formTexts.toasts.emptyFields.title, formTexts.toasts.emptyFields.message);
      return;
    }
    setIsLoading(true);
    try {
      await login(email, password);
      onLoginSuccess?.(email);
      router.replace(routes.dashboard);
    } catch (error: unknown) {
      console.error(error);
      const message =
        error instanceof Error
          ? formTexts.toasts.loginError.message
          : formTexts.toasts.unexpectedError.message;
      showToast("error", "Erro de Login", message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = () => {
    router.push(routes.signup);
  };

  const isFormInvalid = !email || !password || isLoading;

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.card}
        accessible
        accessibilityLabel={formTexts.accessibility.form}
      >
        <LoginIllustration
          width={'100%'}
          style={styles.illustration}
          accessible
          accessibilityLabel={formTexts.accessibility.illustration}
        />

        <Text style={styles.title} accessibilityRole="header">{formTexts.title}</Text>

        <Text style={styles.label}>{formTexts.labels.email}</Text>
        <TextInput
          placeholder={formTexts.placeholders.email}
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel={formTexts.accessibility.emailInput}
        />

        <Text style={styles.label}>{formTexts.labels.password}</Text>
        <TextInput
          placeholder={formTexts.placeholders.password}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          accessibilityLabel={formTexts.accessibility.passwordInput}
          accessibilityHint={formTexts.accessibility.passwordHint}
        />

        <Link href={routes.forgotPassword} asChild>
          <Pressable
            accessibilityRole="link"
            accessibilityLabel={formTexts.accessibility.forgotLink}
          >
            <Text style={styles.forgot}>{formTexts.buttons.forgot}</Text>
          </Pressable>
        </Link>

        <View style={styles.alignButtons}>
          <Pressable
            onPress={handleLogin}
            style={[styles.button, styles.submitButton, isFormInvalid && styles.submitButtonDisabled]}
            disabled={isFormInvalid}
            accessibilityRole="button"
            accessibilityLabel={formTexts.accessibility.submitButton}
            accessibilityHint={formTexts.accessibility.submitHint}
          >
            {isLoading ? (
              <ActivityIndicator color={tokens.byteColorWhite} />
            ) : (
              <Text style={styles.buttonText}>{formTexts.buttons.submit}</Text>
            )}
          </Pressable>

          <Pressable
            onPress={handleCreateAccount}
            style={[styles.button, styles.createButton]}
            accessibilityRole="button"
            accessibilityLabel={formTexts.accessibility.createButton}
            accessibilityHint={formTexts.accessibility.createHint}
          >
            <Text style={[styles.buttonText]}>{formTexts.buttons.create}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

