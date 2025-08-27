import { useAuth } from "@/src/contexts/AuthContext";
import { routes } from "@/src/routes"; // ✅ centralizando rotas
import { router } from "expo-router"; // ✅ para navegação
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
import { styles } from "./ForgotPasswordForm.styles";

type ForgotPasswordFormProps = {
  /** Callback opcional para submit externo */
  onSubmitSuccess?: (email: string) => void;
};

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmitSuccess,
}) => {
  const [email, setEmail] = useState<string>("");
  const { resetPassword } = useAuth(); // 🔌 usando AuthContext

  const handleChangeText = (text: string) => setEmail(text);

  const handleChangeEvent = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => setEmail(e.nativeEvent.text);

  const handleSubmit = async () => {
    if (!email) {
      Alert.alert("Atenção", "Informe o e-mail cadastrado.");
      return;
    }

    try {
      await resetPassword(email);
      Alert.alert(
        "Pronto!",
        "Se estiver cadastrado, enviaremos um link de recuperação."
      );
      onSubmitSuccess?.(email);
      router.replace(routes.login); // ✅ redireciona para login depois de enviar
    } catch (error: any) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível enviar o link de recuperação.");
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Recuperar senha</Text>

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
      />

      <Pressable onPress={handleSubmit} style={styles.submit}>
        <Text style={styles.submitText}>ENVIAR LINK</Text>
      </Pressable>

      {/* ✅ botão extra para voltar ao login */}
      <Pressable
        onPress={() => router.push(routes.login)}
        style={styles.backButton}
      >
        <Text style={styles.backText}>Voltar ao login</Text>
      </Pressable>
    </View>
  );
};
