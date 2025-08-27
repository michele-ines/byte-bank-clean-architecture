import { tokens } from "@/src/theme/tokens";
import ExpoCheckbox from "expo-checkbox";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";

import SignupIllustration from "@/assets/images/cadastro/ilustracao-cadastro.svg";
import { useAuth } from "@/src/contexts/AuthContext"; // 🔌 plugando no contexto
import { routes } from "@/src/routes"; // ✅ centralizando rotas
import { styles } from "./SignupForm.styles";

type SignupFormProps = {
  /** Callback opcional após cadastro com sucesso */
  onSignupSuccess?: (email: string) => void;
};

export const SignupForm: React.FC<SignupFormProps> = ({ onSignupSuccess }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isChecked, setChecked] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");

  const { signup } = useAuth(); // 🔌 usando signup do contexto

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
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return;
    }
    if (!isChecked) {
      Alert.alert("Atenção", "Você precisa aceitar os termos e condições.");
      return;
    }
    if (emailError) {
      Alert.alert("Atenção", "Por favor, corrija o email antes de continuar.");
      return;
    }

    try {
      await signup(email, password); // 🔌 via contexto
      onSignupSuccess?.(email);
      Alert.alert("Sucesso!", "Conta criada. Você será redirecionado.");
      router.replace(routes.dashboard); // ✅ vai direto para o dashboard
    } catch (error: any) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Erro", "Este e-mail já está em uso.");
      } else {
        Alert.alert("Erro", "Ocorreu um erro ao criar a conta.");
      }
    }
  };

  return (
    <View style={styles.card}>
      <SignupIllustration width={"100%"} height={150} style={styles.illustration} />

      <Text style={styles.title}>
        Preencha os campos abaixo para criar sua conta corrente!
      </Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Digite seu email"
        value={email}
        onChangeText={validateEmail}
        style={[styles.input, emailError ? styles.inputError : null]}
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType="emailAddress"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <Text style={styles.label}>Senha</Text>
      <TextInput
        placeholder="Digite sua senha"
        value={password}
        onChange={handlePasswordChange}
        style={styles.input}
        secureTextEntry
      />

      <Text style={styles.label}>Confirmar Senha</Text>
      <TextInput
        placeholder="Confirme sua senha"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        style={styles.input}
        secureTextEntry
      />

      <View style={styles.checkboxContainer}>
        <ExpoCheckbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? tokens.byteColorGreen500 : undefined}
        />
        <Text style={styles.checkboxLabel}>
          Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito
          na Política de Privacidade do banco.
        </Text>
      </View>

      <Pressable onPress={handleSubmit} style={[styles.button, styles.submitButton]}>
        <Text style={styles.buttonText}>Criar conta</Text>
      </Pressable>

      {/* ✅ botão extra para voltar ao login */}
      <Pressable
        onPress={() => router.push(routes.login)}
        style={[styles.button, styles.backButton]}
      >
        <Text style={styles.backText}>Voltar ao login</Text>
      </Pressable>
    </View>
  );
};
