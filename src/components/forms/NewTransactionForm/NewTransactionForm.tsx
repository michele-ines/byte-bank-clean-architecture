import CardPixelsTop from "@/assets/images/dash-card-new-transacao/card-pixels-3.svg";
import CardPixelBotton from "@/assets/images/dash-card-new-transacao/card-pixels-4.svg";
import TransactionIllustration from "@/assets/images/dash-card-new-transacao/Ilustracao-2.svg";
import { useTransactions } from "@/src/contexts/TransactionsContext";
import { ITransaction } from "@/src/interfaces/ITransaction";
import { tokens } from "@/src/theme/tokens";
import { ToastType, TransactionType, TransactionTypeItems } from "@/src/types/types";
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
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { MaskedTextInput } from "react-native-mask-text";
import Toast from "react-native-toast-message";
import { styles } from "./NewTransactionForm.styles";

// ------------------------------
// Helpers
// ------------------------------
const formatTransactionDescription = (type: string, value: number): string => {
  const formattedValue = value.toFixed(2).replace(".", ",");
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  return `${capitalizedType} - ${tokens.currencyPrefix}${formattedValue}`;
};

const showToast = (type: ToastType, text1: string, text2: string) => {
  Toast.show({ type, text1, text2 });
};

// ------------------------------
// Componente principal
// ------------------------------
export const NewTransactionForm: React.FC = () => {
  const { addTransaction } = useTransactions();
  const [transactionType, setTransactionType] = useState<TransactionType>();
  const [unmaskedAmount, setUnmaskedAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(TransactionTypeItems);

  const t = tokens.newTransactionForm; // 👈 alias para os textos

  const numericAmount = unmaskedAmount ? parseFloat(unmaskedAmount) / 100 : 0;
  const isFormInvalid =
    !transactionType || !unmaskedAmount || numericAmount <= 0 || isLoading;

  const handleSubmit = async () => {
    if (!transactionType || numericAmount <= 0) {
      showToast("error", t.toasts.emptyFields.title, t.toasts.emptyFields.message);
      return;
    }

    setIsLoading(true);
    try {
      const description = formatTransactionDescription(transactionType, numericAmount);

      await addTransaction({
        tipo: transactionType,
        valor: numericAmount,
        description,
      } satisfies ITransaction);

      showToast("success", t.toasts.success.title, t.toasts.success.message);
      setTransactionType(undefined);
      setUnmaskedAmount("");
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
      showToast("error", t.toasts.error.title, t.toasts.error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={tokens.barStyle} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <CardPixelsTop
            style={styles.cardPixelsTop}
            accessible
            accessibilityLabel={t.accessibility.cardTopIllustration}
          />

          <ScrollView
            contentContainerStyle={styles.scrollContentContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            accessible
            accessibilityLabel={t.accessibility.form}
          >
            <Text style={styles.title} accessibilityRole="header">
              {t.title}
            </Text>

            <Text style={styles.label}>{t.labels.transactionType}</Text>
            <View
              style={styles.pickerContainer}
              accessible
              accessibilityRole="combobox"
              accessibilityLabel={t.accessibility.transactionTypeInput}
              accessibilityHint={t.accessibility.transactionTypeHint}
            >
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
                placeholder={t.placeholders.transactionType}
                disabled={isLoading}
                modalTitle={t.labels.transactionType}
                style={styles.dropdownPicker}
              />
            </View>

            <Text style={styles.label}>{t.labels.amount}</Text>
            <MaskedTextInput
              type="currency"
              options={{
                prefix: tokens.currencyPrefix,
                decimalSeparator: ",",
                groupSeparator: ".",
                precision: 2,
              }}
              value={unmaskedAmount}
              onChangeText={(_, rawText) => setUnmaskedAmount(rawText)}
              style={styles.input}
              maxLength={tokens.maxLenght}
              keyboardType="decimal-pad"
              placeholder={t.placeholders.amount}
              accessibilityLabel={t.accessibility.amountInput}
              accessibilityHint={t.accessibility.amountHint}
            />

            <Pressable
              onPress={handleSubmit}
              style={[styles.submitButton, isFormInvalid && { opacity: tokens.opacityMd }]}
              disabled={isFormInvalid}
              accessibilityRole="button"
              accessibilityLabel={t.accessibility.submitButton}
              accessibilityHint={isLoading ? t.accessibility.submitButtonLoading : undefined}
            >
              {isLoading ? (
                <ActivityIndicator
                  size={tokens.heightIndicator}
                  color={tokens.byteColorWhite}
                  accessibilityLabel={t.accessibility.loading}
                />
              ) : (
                <Text style={styles.submitButtonText}>{t.buttons.submit}</Text>
              )}
            </Pressable>

            <View style={styles.bottomIllustrationsContainer}>
              <TransactionIllustration
                style={styles.illustration}
                accessible
                accessibilityLabel={t.accessibility.mainIllustration}
              />
              <CardPixelBotton
                style={styles.cardPixelsBotton}
                accessible
                accessibilityLabel={t.accessibility.cardBottomIllustration}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
