import { tokens } from "@/src/theme/tokens";
import ExpoCheckbox from "expo-checkbox";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";

import SignupIllustration from "@/assets/images/cadastro/ilustracao-cadastro.svg";
import { useAuth } from "@/src/contexts/AuthContext";
import { routes } from "@/src/routes";
import Toast from "react-native-toast-message";
import { styles } from "./SignupForm.styles";

const signupFormTexts = {
  title: "Preencha os campos abaixo para criar sua conta corrente!",
  fields: {
    name: "Nome",
    email: "Email",
    password: "Senha",
    confirmPassword: "Confirmar Senha",
  },
  placeholders: {
    name: "Digite seu nome",
    email: "Digite seu email",
    password: "Digite sua senha",
    confirmPassword: "Confirme sua senha",
  },
  checkboxLabel:
    "Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco.",
  buttons: {
    submit: "Criar conta",
    back: "Voltar ao login",
  },
  alerts: {
    emptyFields: { title: "Atenção", message: "Por favor, preencha todos os campos." },
    passwordMismatch: { title: "Atenção", message: "As senhas não coincidem." },
    termsNotAccepted: { title: "Atenção", message: "Você precisa aceitar os termos e condições." },
    emailInvalid: { title: "Atenção", message: "Por favor, corrija o email antes de continuar." },
    success: { title: "Sucesso!", message: "Conta criada. Você será redirecionado." },
    emailInUse: { title: "Erro", message: "Este e-mail já está em uso." },
    genericError: { title: "Erro", message: "Ocorreu um erro ao criar a conta." },
  },
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

  const handlePasswordChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) =>
    setPassword(e.nativeEvent.text);

  const handleConfirmPasswordChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) =>
    setConfirmPassword(e.nativeEvent.text);

  const handleSubmit = async () => {
    const { alerts } = signupFormTexts;

    if (!name || !email || !password || !confirmPassword) {
      Toast.show({ type: 'error', text1: alerts.emptyFields.title, text2: alerts.emptyFields.message });
      return;
    }
    if (password !== confirmPassword) {
      Toast.show({ type: 'error', text1: alerts.passwordMismatch.title, text2: alerts.passwordMismatch.message });
      return;
    }
    if (!isChecked) {
      Toast.show({ type: 'error', text1: alerts.termsNotAccepted.title, text2: alerts.termsNotAccepted.message });
      return;
    }
    if (emailError) {
      Toast.show({ type: 'error', text1: alerts.emailInvalid.title, text2: alerts.emailInvalid.message });
      return;
    }

    try {
      await signup(email, password, name);
      onSignupSuccess?.(email);
      Toast.show({ type: 'success', text1: alerts.success.title, text2: alerts.success.message });
      router.replace(routes.dashboard);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        Toast.show({ type: 'error', text1: alerts.emailInUse.title, text2: alerts.emailInUse.message });
      } else {
        Toast.show({ type: 'error', text1: alerts.genericError.title, text2: alerts.genericError.message });
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: tokens.byteBgDefault }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={styles.card}
          accessible
          accessibilityLabel="Formulário de cadastro de conta corrente"
        >
          <SignupIllustration
            width="100%"
            height={tokens.illustrationSignupHeight}
            style={styles.illustration}
            accessibilityLabel="Ilustração de uma pessoa a interagir com um ecrã de portátil seguro"
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
            onChange={handlePasswordChange}
            style={styles.input}
            secureTextEntry
            accessibilityLabel={signupFormTexts.fields.password}
          />

          {/* Confirmar Senha */}
          <Text style={styles.label}>{signupFormTexts.fields.confirmPassword}</Text>
          <TextInput
            placeholder={signupFormTexts.placeholders.confirmPassword}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
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
              accessibilityLabel={signupFormTexts.checkboxLabel}
              accessibilityState={{ checked: isChecked }}
            />
            <Text style={styles.checkboxLabel}>{signupFormTexts.checkboxLabel}</Text>
          </View>

          {/* Botão Criar conta */}
          <Pressable
            onPress={handleSubmit}
            style={[styles.button, styles.submitButton]}
            accessibilityRole="button"
            accessibilityLabel={signupFormTexts.buttons.submit}
          >
            <Text style={styles.buttonText}>{signupFormTexts.buttons.submit}</Text>
          </Pressable>

          {/* Botão Voltar */}
          <Pressable
            onPress={() => router.push(routes.login)}
            style={[styles.button, styles.backButton]}
            accessibilityRole="button"
            accessibilityLabel={signupFormTexts.buttons.back}
          >
            <Text style={styles.backText}>{signupFormTexts.buttons.back}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

