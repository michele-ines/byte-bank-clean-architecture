// src/components/NewTransactionForm.tsx

import CardPixelsTop from "@/assets/images/dash-card-new-transacao/card-pixels-3.svg";
import CardPixelBotton from '@/assets/images/dash-card-new-transacao/card-pixels-4.svg';
import TransactionIllustration from '@/assets/images/dash-card-new-transacao/Ilustracao-2.svg';
import { useTransactions } from "@/src/contexts/TransactionsContext";
import { ITransaction } from "@/src/interfaces/ITransaction";
import { tokens } from "@/src/theme/tokens";
import { TransactionType, transactionTypeItems } from "@/src/types/types";
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
import DropDownPicker from "react-native-dropdown-picker";
import { MaskedTextInput } from "react-native-mask-text";
import { styles } from "./NewTransactionForm.styles";
import { formatTransactionDescription, formTexts, showToast } from "./NewTransactionForm.texts";

export const NewTransactionForm: React.FC = () => {
  const { addTransaction } = useTransactions();
  const [transactionType, setTransactionType] = useState<TransactionType>();
  const [unmaskedAmount, setUnmaskedAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(transactionTypeItems)
  const handleSubmit = async () => {
  if (!transactionType || numericAmount <= 0) {
    showToast(
      "error",
      formTexts.toasts.emptyFields.title,
      formTexts.toasts.emptyFields.message
    );
    return;
  }
    setIsLoading(true);
    try {
      const numericAmount = parseFloat(unmaskedAmount) / 100;
      const description = formatTransactionDescription(transactionType, numericAmount);

      await addTransaction({
        tipo: transactionType,
        valor: numericAmount,
        description: description,
      } satisfies ITransaction);

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
  const numericAmount = unmaskedAmount ? parseFloat(unmaskedAmount) / 100 : 0;
  const isFormInvalid =
    !transactionType ||
    !unmaskedAmount ||
    numericAmount <= 0 ||
    isLoading;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={tokens.barStyle as any} />
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

            <Text style={styles.label} accessibilityRole="text">{formTexts.labels.transactionType}</Text>
              <View style={[styles.pickerContainer]}     
                accessible
                accessibilityRole="combobox"
                accessibilityLabel={formTexts.accessibility.transactionTypeInput}
                accessibilityHint={formTexts.accessibility.transactionTypeHint}>
                <DropDownPicker
                  open={open}
                  value={transactionType ?? null}
                  items={items}
                  setOpen={setOpen}
                  setItems={setItems}
                  setValue={(getValue) => {
                    const v = getValue(transactionType ?? null) as TransactionType | null;
                    setTransactionType(v ?? undefined);
                  }}
                  placeholder={formTexts.placeholders.transactionType}
                  disabled={isLoading}
                  modalTitle={formTexts.labels.transactionType}
                  style={
                    styles.dropdownPicker
                  }
                />
            </View>

            <Text style={styles.label} accessibilityRole="text">{formTexts.labels.amount}</Text>
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
              maxLength={tokens.maxLenght}
              keyboardType="decimal-pad"
              placeholder={formTexts.placeholders.amount}
              accessibilityLabel={formTexts.accessibility.amountInput}
              accessibilityHint={formTexts.accessibility.amountHint}
            />

            <Pressable
              onPress={handleSubmit}
              style={[styles.submitButton, isFormInvalid && { opacity: tokens.opacityMd }]}
              disabled={isFormInvalid}
              accessibilityRole="button"
              accessibilityLabel={formTexts.accessibility.submitButton}
              accessibilityHint={isLoading ? formTexts.accessibility.submitButtonLoading : ""}
            >
              {isLoading ? (
                <ActivityIndicator color={tokens.byteColorWhite} accessibilityLabel="Carregando transação"/>
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
