import { useAuth } from "@/src/contexts/AuthContext";
import { routes } from "@/src/routes";
import { tokens } from "@/src/theme/tokens";
import { ToastType } from "@/src/types/types";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { styles } from "./ForgotPasswordForm.styles";

const formTexts = {
  title: "Recuperar Senha",
  label: "E-mail",
  placeholder: "Digite seu e-mail cadastrado",
  buttons: {
    submit: "ENVIAR LINK",
    back: "Voltar ao Login",
  },
  accessibility: {
    form: "Formulário de recuperação de senha",
    emailInput: "Campo de entrada para o e-mail de recuperação",
    submitButton: "Botão para enviar link de recuperação de senha",
    submitHint: "Envia um link de recuperação para o e-mail informado",
    backButton: "Botão para voltar à tela de login",
  },
  toasts: {
    emptyEmail: {
      title: "Atenção",
      message: "Informe o e-mail cadastrado.",
    },
    success: {
      title: "Pronto!",
      message: "Se o e-mail estiver cadastrado, um link será enviado.",
    },
    error: {
      title: "Erro",
      message: "Não foi possível enviar o link de recuperação.",
    },
  },
};


type ForgotPasswordFormProps = {
  onSubmitSuccess?: (email: string) => void;
};

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmitSuccess,
}) => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { resetPassword } = useAuth();

  const showToast = (type: ToastType, text1: string, text2: string) => {
    Toast.show({ type, text1, text2 });
  };

  const handleSubmit = async () => {
    if (!email) {
      showToast("error", formTexts.toasts.emptyEmail.title, formTexts.toasts.emptyEmail.message);
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(email);
      showToast("success", formTexts.toasts.success.title, formTexts.toasts.success.message);
      onSubmitSuccess?.(email);
      router.replace(routes.login);
    } catch (error: unknown) {
      console.error(error);
      const message = error instanceof Error ? error.message : formTexts.toasts.error.message;
      showToast("error", formTexts.toasts.error.title, message);
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = !email || isLoading;

  return (
    <View
      style={styles.card}
      accessible
      accessibilityLabel={formTexts.accessibility.form}
    >
      <Text style={styles.title} accessibilityRole="header">
        {formTexts.title}
      </Text>

      <Text style={styles.label}>{formTexts.label}</Text>
      <TextInput
        placeholder={formTexts.placeholder}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        accessibilityLabel={formTexts.accessibility.emailInput}
      />

      <Pressable
        onPress={handleSubmit}
        style={[styles.submit, isButtonDisabled && styles.submitDisabled]}
        disabled={isButtonDisabled} 
        accessibilityRole="button"
        accessibilityLabel={formTexts.accessibility.submitButton}
        accessibilityHint={formTexts.accessibility.submitHint}
      >
        {isLoading ? (
          <ActivityIndicator color={tokens.byteColorWhite} />
        ) : (
          <Text style={styles.submitText}>{formTexts.buttons.submit}</Text>
        )}
      </Pressable>

      <Pressable
        onPress={() => router.push(routes.login)}
        style={styles.backButton}
        accessibilityRole="button"
        accessibilityLabel={formTexts.accessibility.backButton}
      >
        <Text style={styles.backText}>{formTexts.buttons.back}</Text>
      </Pressable>
    </View>
  );
};

