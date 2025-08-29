import LoginIllustration from "@/assets/images/login/ilustracao-login.svg";
import { useAuth } from "@/src/contexts/AuthContext"; // 🔌 usando contexto
import { routes } from "@/src/routes"; // ✅ centralizando rotas
import { Link, router } from "expo-router";
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
      Alert.alert("Atenção", "Informe e-mail e senha.");
      return;
    }
    try {
      await login(email, password); // 🔌 chamada pelo contexto
      onLoginSuccess?.(email);
      router.replace(routes.dashboard); // ✅ rota tipada
    } catch (error: any) {
      console.error(error);
      Alert.alert("Erro de Login", "Email ou senha inválidos.");
    }
  };

  const handleCreateAccount = () => {
    router.push(routes.signup); // ✅ rota tipada
  };

  return (
    <View style={styles.card}>
      <LoginIllustration width={"100%"} style={styles.illustration} />

      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Digite seu email"
        value={email}
        onChangeText={handleChangeEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType="emailAddress"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        placeholder="Digite sua senha"
        value={password}
        secureTextEntry
        onChange={handleChangePassword}
        style={styles.input}
      />

      <Link href={routes.forgotPassword} asChild>
        <Pressable>
          <Text style={styles.forgot}>Esqueci a senha!</Text>
        </Pressable>
      </Link>

      <View style={styles.alignButtons}>
        <Pressable
          onPress={handleLogin}
          style={[styles.button, styles.submitButton]}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </Pressable>
        <Pressable
          onPress={handleCreateAccount}
          style={[styles.button, styles.createButton]}
        >
          <Text style={styles.buttonText}>Criar conta</Text>
        </Pressable>
      </View>
    </View>
  );
};
