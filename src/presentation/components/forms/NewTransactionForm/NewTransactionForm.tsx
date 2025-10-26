import CardPixelsTop from "@/assets/images/dash-card-new-transacao/card-pixels-3.svg";
import CardPixelBotton from "@/assets/images/dash-card-new-transacao/card-pixels-4.svg";
import TransactionIllustration from "@/assets/images/dash-card-new-transacao/Ilustracao-2.svg";

import { DefaultButton } from "@presentation/components/common/common/DefaultButton/DefaultButton";
import { useTransactions } from "@presentation/state/TransactionsContext";
import { layout, texts } from "@presentation/theme";
import { INewTransactionInput } from "@shared/interfaces/auth.interfaces";
import { TransactionType, TransactionTypeItems } from "@shared/ProfileStyles/profile.styles.types";
import { formatTransactionDescription, showToast } from "@shared/utils/transactions.utils";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaskedTextInput } from "react-native-mask-text";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./NewTransactionForm.styles";

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

  const t = texts.newTransactionForm;

  const numericAmount = unmaskedAmount ? parseFloat(unmaskedAmount) / 100 : 0;
  const isFormInvalid =
    !transactionType || !unmaskedAmount || numericAmount <= 0 || isLoading;

  const handleSubmit = async () => {
    if (!transactionType || numericAmount <= 0) {
      showToast(
        "error",
        t.toasts.emptyFields.title,
        t.toasts.emptyFields.message
      );
      return;
    }

    setIsLoading(true);
    try {
      const description = formatTransactionDescription(
        transactionType,
        numericAmount
      );

      await addTransaction({
        tipo: transactionType,
        valor: numericAmount,
        description,
      } satisfies INewTransactionInput);

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
      <StatusBar barStyle={layout.barStyle} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <CardPixelsTop
            style={styles.cardPixelsTop}
            accessible
            accessibilityLabel={t.accessibility.cardTopIllustration}
          />

          {/* ⬇️ Substituí ScrollView por KeyboardAwareScrollView */}
          <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollContentContainer}
            enableOnAndroid={true}
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
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
                  const v = getValue(
                    transactionType ?? null
                  ) as TransactionType | null;
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
                prefix: texts.currencyPrefix,
                decimalSeparator: ",",
                groupSeparator: ".",
                precision: 2,
              }}
              value={unmaskedAmount}
              onChangeText={(_, rawText) => setUnmaskedAmount(rawText)}
              style={styles.input}
              maxLength={layout.maxLenght}
              keyboardType="decimal-pad"
              placeholder={t.placeholders.amount}
              accessibilityLabel={t.accessibility.amountInput}
              accessibilityHint={t.accessibility.amountHint}
            />

            <DefaultButton
              title={t.buttons.submit}
              loading={isLoading}
              disabled={isFormInvalid}
              onPress={handleSubmit}
              buttonStyle={styles.submitButton}
              textStyle={styles.submitButtonText}
              accessibilityLabel={t.accessibility.submitButton}
              accessibilityHint={
                isLoading ? t.accessibility.submitButtonLoading : undefined
              }
            />

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
          </KeyboardAwareScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
