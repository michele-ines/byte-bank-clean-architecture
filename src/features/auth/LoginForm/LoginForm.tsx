import LoginIllustration from "@/assets/images/login/ilustracao-login.svg";
import { useAuth } from "@/src/contexts/AuthContext"; // 🔌 usando contexto
import { routes } from "@/src/routes"; // ✅ centralizando rotas
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  Text,
  TextInput,
  TextInputChangeEventData,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { styles } from "./LoginForm.styles";

type LoginFormProps = {
  /** Callback opcional para login bem-sucedido */
  onLoginSuccess?: (email: string) => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useAuth(); // 🔌 hook do contexto

  const handleChangeEmail = (text: string) => setEmail(text);
  const handleChangePassword = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => setPassword(e.nativeEvent.text);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Atenção',
        text2: 'Informe e-mail e senha.',
      });
      return;
    }
    try {
      await login(email, password);
      onLoginSuccess?.(email);
      router.replace(routes.dashboard); 
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Erro de Login',
        text2: 'Email ou senha inválidos.',
      });
    }
  };

  const handleCreateAccount = () => {
    router.push(routes.signup); 
  };

  return (
  <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={styles.card}
        accessible
        accessibilityLabel="Formulário de login"
      >
        <LoginIllustration 
          width={'100%'} 
          style={styles.illustration} 
          accessibilityLabel="Ilustração de uma pessoa usando um celular para fazer login"
        />

        <Text style={styles.title} accessibilityRole="header">Login</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Digite seu email"
          value={email}
          onChangeText={handleChangeEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Campo de entrada para o email"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          style={styles.input} 
          secureTextEntry
          accessibilityLabel="Campo de entrada para a senha"
          accessibilityHint="A sua senha é secreta e não será partilhada"
        />

        <Link href={routes.forgotPassword} asChild>
          <Pressable
            accessibilityRole="link"
            accessibilityLabel="Esqueci a senha, toque para recuperar"
          >
            <Text style={styles.forgot}>Esqueci a senha!</Text>
          </Pressable>
        </Link>

        <View style={styles.alignButtons}>
          <Pressable 
            onPress={handleLogin} 
            style={[styles.button, styles.submitButton]}
            accessibilityRole="button"
            accessibilityLabel="Botão para acessar sua conta"
          >
            <Text style={styles.buttonText}>Acessar</Text>
          </Pressable>

          <Pressable 
            onPress={handleCreateAccount} 
            style={[styles.button, styles.createButton]}
            accessibilityRole="button"
            accessibilityLabel="Botão para criar uma nova conta"
          >
            <Text style={[styles.buttonText]}>Criar conta</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
