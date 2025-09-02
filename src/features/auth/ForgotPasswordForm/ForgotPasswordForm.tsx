import { useAuth } from "@/src/contexts/AuthContext";
import { routes } from "@/src/routes"; // ✅ centralizando rotas
import { router } from "expo-router"; // ✅ para navegação
import React, { useState } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import Toast from "react-native-toast-message"; // 1. Importar o Toast
import { styles } from "./ForgotPasswordForm.styles";

type ForgotPasswordFormProps = {
  /** Callback opcional para submit externo */
  onSubmitSuccess?: (email: string) => void;
};

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmitSuccess,
}) => {
  const [email, setEmail] = useState<string>("");
  const { resetPassword } = useAuth();

  const handleChangeText = (text: string) => setEmail(text);

  const handleChangeEvent = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => setEmail(e.nativeEvent.text);

  const handleSubmit = async () => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Atenção',
        text2: 'Informe o e-mail cadastrado.'
      });
      return;
    }

    try {
      await resetPassword(email);
      Toast.show({
        type: 'success',
        text1: 'Pronto!',
        text2: 'Se estiver cadastrado, enviaremos um link de recuperação.'
      });
      onSubmitSuccess?.(email);
      router.replace(routes.login);
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível enviar o link de recuperação.'
      });
    }
  };

  return (
    <View 
      style={styles.card}
      accessible
      accessibilityLabel="Formulário de recuperação de senha"
    >
      <Text style={styles.title} accessibilityRole="header">Recuperar senha</Text>

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        placeholder="Digite seu e-mail cadastrado"
        value={email}
        onChangeText={handleChangeText}
        onChange={handleChangeEvent}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        accessibilityLabel="Campo de entrada para o e-mail de recuperação"
      />

      <Pressable 
        onPress={handleSubmit} 
        style={styles.submit}
        accessibilityRole="button"
        accessibilityLabel="Botão para enviar link de recuperação de senha"
      >
        <Text style={styles.submitText}>ENVIAR LINK</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push(routes.login)}
        style={styles.backButton}
        accessibilityRole="button"
        accessibilityLabel="Botão para voltar à tela de login"
      >
        <Text style={styles.backText}>Voltar ao login</Text>
      </Pressable>
    </View>
  );
};

