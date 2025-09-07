// src/components/NewTransactionForm.tsx

import CardPixelsTop from "@/assets/images/dash-card-new-transacao/card-pixels-3.svg";
import CardPixelBotton from '@/assets/images/dash-card-new-transacao/card-pixels-4.svg';
import TransactionIllustration from '@/assets/images/dash-card-new-transacao/Ilustracao-2.svg';
import { useTransactions } from "@/src/contexts/TransactionsContext";
import { ToastType } from "@/src/types/types";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import Toast from "react-native-toast-message";
import { styles } from "./NewTransactionForm.styles";
const formTexts = {
  title: "Nova transação",
  labels: {
    transactionType: "Tipo de transação",
    amount: "Valor",
  },
  placeholders: {
    transactionType: "Selecione o tipo de transação",
    amount: "0,00",
  },
  buttons: {
    submit: "CONCLUIR TRANSAÇÃO",
  },
  accessibility: {
    form: "Formulário de nova transação",
    cardTopIllustration: "Ilustração decorativa superior com pixels",
    transactionTypeInput: "Seletor de tipo de transação",
    amountInput: "Campo de entrada de valor da transação",
    amountHint: "Digite o valor numérico da transação",
    submitButton: "Concluir e salvar nova transação",
    submitButtonLoading: "Salvando transação, por favor aguarde.",
    mainIllustration: "Ilustração de uma pessoa com um cartão de crédito",
    cardBottomIllustration: "Ilustração decorativa inferior com pixels",
  },
  toasts: {
    emptyFields: { title: "Atenção", message: "Selecione o tipo e informe o valor." },
    success: { title: "Sucesso!", message: "Transação adicionada com sucesso." },
    error: { title: "Erro", message: "Não foi possível adicionar a transação." },
  },
};

const showToast = (type: ToastType, text1: string, text2: string) => {
  Toast.show({ type, text1, text2 });
};

export const NewTransactionForm: React.FC = () => {
 const { addTransaction } = useTransactions();
  const [transactionType, setTransactionType] = useState<string>();
  const [unmaskedAmount, setUnmaskedAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!transactionType || !unmaskedAmount) {
      showToast("error", formTexts.toasts.emptyFields.title, formTexts.toasts.emptyFields.message);
      return;
    }
    setIsLoading(true);
    try {
       const numericAmount = parseFloat(unmaskedAmount) / 100;
      
      const description = `${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} - R$ ${numericAmount.toFixed(2).replace('.', ',')}`;

      await addTransaction({
        tipo: transactionType,
        valor: numericAmount,
        description: description,
      });

      showToast("success", formTexts.toasts.success.title, formTexts.toasts.success.message);
      setTransactionType(undefined);
      setUnmaskedAmount("");
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
      showToast("error", formTexts.toasts.error.title, formTexts.toasts.error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormInvalid = !transactionType || !unmaskedAmount || isLoading;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <CardPixelsTop
            style={styles.cardPixelsTop}
            accessible
            accessibilityLabel={formTexts.accessibility.cardTopIllustration}
          />

          <ScrollView
            contentContainerStyle={styles.scrollContentContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            accessible
            accessibilityLabel={formTexts.accessibility.form}
          >
            <Text style={styles.title} accessibilityRole="header">{formTexts.title}</Text>

            <Text style={styles.label}>{formTexts.labels.transactionType}</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={transactionType}
                onValueChange={(itemValue) => setTransactionType(itemValue)}
                style={styles.picker}
                accessibilityLabel={formTexts.accessibility.transactionTypeInput}
              >
                <Picker.Item label={formTexts.placeholders.transactionType} value={undefined} enabled={false} />
                <Picker.Item label="Deposito" value="deposito" />
                <Picker.Item label="Câmbio" value="cambio" />
                <Picker.Item label="Transferência" value="transferencia" />
              </Picker>
            </View>

            <Text style={styles.label}>{formTexts.labels.amount}</Text>
            <MaskedTextInput
              type="currency"
              options={{
                prefix: 'R$ ',
                decimalSeparator: ',',
                groupSeparator: '.',
                precision: 2,
              }}
              value={unmaskedAmount}
              onChangeText={(_, rawText) => {
                setUnmaskedAmount(rawText);
              }}
              style={styles.input}
              keyboardType="decimal-pad"
              placeholder={formTexts.placeholders.amount}
              accessibilityLabel={formTexts.accessibility.amountInput}
              accessibilityHint={formTexts.accessibility.amountHint}
            />

            <Pressable
              onPress={handleSubmit}
              style={[styles.submitButton, isFormInvalid && { opacity: 0.6 }]} 
              disabled={isFormInvalid}
              accessibilityRole="button"
              accessibilityLabel={formTexts.accessibility.submitButton}
              accessibilityHint={isLoading ? formTexts.accessibility.submitButtonLoading : ""}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>{formTexts.buttons.submit}</Text>
              )}
            </Pressable>

            <View style={styles.bottomIllustrationsContainer}>
              <TransactionIllustration
                style={styles.illustration}
                accessible
                accessibilityLabel={formTexts.accessibility.mainIllustration}
              />
              <CardPixelBotton
                style={styles.cardPixelsBotton}
                accessible
                accessibilityLabel={formTexts.accessibility.cardBottomIllustration}
              />
            </View>

          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};