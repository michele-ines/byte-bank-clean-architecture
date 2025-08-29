import { useTransactions } from "@/src/hooks/useTransactions";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles } from "./NewTransactionForm.styles";

export const NewTransactionForm: React.FC = () => {
  const { addTransactionWithReceipt } = useTransactions();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [receiptUri, setReceiptUri] = useState<string | null>(null);

  const handlePickReceipt = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setReceiptUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!description || !amount) {
      Alert.alert("Atenção", "Preencha descrição e valor.");
      return;
    }

    try {
      await addTransactionWithReceipt(
        {
          description,
          amount: parseFloat(amount),
          date: new Date(),
        },
        receiptUri ?? "" // se não tiver recibo, salva sem ele
      );

      Alert.alert("Sucesso", "Transação adicionada com sucesso!");
      setDescription("");
      setAmount("");
      setReceiptUri(null);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível adicionar a transação.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Transação</Text>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Ex: Depósito salário"
        style={styles.input}
      />

      <Text style={styles.label}>Valor</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="Ex: 500.00"
        keyboardType="decimal-pad"
        style={styles.input}
      />

      <Pressable onPress={handlePickReceipt} style={styles.receiptButton}>
        <Text style={styles.receiptButtonText}>
          {receiptUri ? "Recibo Selecionado ✅" : "Selecionar Recibo"}
        </Text>
      </Pressable>

      <Pressable onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Salvar Transação</Text>
      </Pressable>
    </View>
  );
};
