import { ITransaction, useTransactions } from "@/src/contexts/TransactionsContext";
import { tokens } from "@/src/theme/tokens";
import React, { useState } from "react";
import { FlatList, Linking, Pressable, Text, View } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import Toast, { ToastType } from "react-native-toast-message";
import { ListFooter } from "../../components/ListFooter/ListFooter";
import { ListHeader } from "../../components/ListHeader/ListHeader";
import { styles } from "./CardListExtract.styles";
import { cardListTexts } from "./cardListExtractTexts";


type CardListExtractProps = {
  filterFn?: (transaction: ITransaction) => boolean;
  title?: string;
};

type EditedValuesMap = {
  [key: string]: string;
};

const showToast = (type: ToastType, text1: string, text2: string) => {
  Toast.show({ type, text1, text2 });
};

export const CardListExtract: React.FC<CardListExtractProps> = ({ filterFn, title }) => {
  const { transactions, loading, loadingMore, hasMore, loadMoreTransactions,  updateTransaction } = useTransactions();

  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState<EditedValuesMap>({});

 
  const filtered = filterFn ? transactions.filter(filterFn) : transactions;

  const handleOpenReceipt = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      showToast("error", cardListTexts.toasts.openReceiptError.title, cardListTexts.toasts.openReceiptError.message);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loadingMore) {
      loadMoreTransactions();
    }
  };

  const handleEditClick = () => {
    const initialValues = filtered.reduce((acc, transaction) => {
      if (transaction.id) {
        const valorComDecimais = transaction.valor.toFixed(2); 
        const valorEmCentavosString = valorComDecimais.replace('.', '');
        acc[transaction.id] = valorEmCentavosString;
      }
      return acc;
    }, {} as EditedValuesMap);
    setEditedValues(initialValues);
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedValues({});
  };

  const handleSaveClick = async () => {
    const updatePromises = Object.entries(editedValues).map(async ([id, rawTextCentavos]) => {
      const transacaoOriginal = transactions.find(t => t.id === id);
      const novoValorNumerico = parseFloat(rawTextCentavos) / 100;

      if (!isNaN(novoValorNumerico) && transacaoOriginal && transacaoOriginal.valor !== novoValorNumerico) {
        return updateTransaction(id, { valor: novoValorNumerico });
      }
      return Promise.resolve();
    });

    try {
      await Promise.all(updatePromises);
      showToast("success", cardListTexts.toasts.saveSuccess.title, cardListTexts.toasts.saveSuccess.message);
    } catch (error) {
      showToast("error", cardListTexts.toasts.saveError.title, cardListTexts.toasts.saveError.message);
    } finally {
      setIsEditing(false);
      setEditedValues({});
    }
  };

  const handleDelete = () => {
    showToast("error", cardListTexts.toasts.deleteSoon.title, cardListTexts.toasts.deleteSoon.message);
  };

 const handleValueChange = (id: string, newValue: string) => {
    setEditedValues(prevValues => ({
      ...prevValues, 
      [id]: newValue, 
    }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id!}
        ListHeaderComponent={
          <ListHeader
            title={title}
            isEditing={isEditing}
            onSave={handleSaveClick}
            onCancel={handleCancelClick}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        }
        renderItem={({ item }) => (
          <View 
            style={styles.card} 
            accessible={true}
            accessibilityLabel={
              !isEditing 
              ? cardListTexts.item.accessibility.cardLabel(item.tipo, item.valor, item.updateAt) 
              : cardListTexts.item.accessibility.editingCardLabel(item.tipo)
            }
          >
            <View style={styles.row}>
              <Text style={styles.description} accessibilityElementsHidden={true}>{item.tipo}</Text>
              
              {isEditing ? (
                <MaskedTextInput
                  style={styles.input}
                  type="currency"
                  options={{
                    prefix: 'R$ ',
                    decimalSeparator: ',',
                    groupSeparator: '.',
                    precision: 2,
                  }}
                  value={editedValues[item.id!]}
                  onChangeText={(_, rawText) => handleValueChange(item.id!, rawText)}
                  keyboardType="decimal-pad"
                  accessibilityLabel={cardListTexts.item.accessibility.amountInputLabel(item.tipo)}
                  accessibilityValue={{ text: cardListTexts.item.accessibility.amountInputValue(item.valor) }}
                  accessibilityHint={cardListTexts.item.accessibility.amountInputHint}
                />
              ) : (
                <Text style={styles.amount} accessibilityElementsHidden={true}>
                  {item.valor >= 0
                    ? `+ R$ ${item.valor.toFixed(2).replace('.', ',')}`
                    : `- R$ ${Math.abs(item.valor).toFixed(2).replace('.', ',')}`}
                </Text>
              )}
            </View>
            <Text style={styles.date} accessibilityElementsHidden={true}>{item.updateAt}</Text>
            {item.receiptUrl && (
              <Pressable
                onPress={() => handleOpenReceipt(item.receiptUrl!)}
                style={styles.receiptButton}
                accessibilityRole="button"
                accessibilityLabel={cardListTexts.item.accessibility.receiptButtonLabel(item.tipo)}
                accessibilityHint={cardListTexts.item.accessibility.receiptButtonHint}
              >
                <Text style={styles.receiptButtonText}>{cardListTexts.item.receiptButton}</Text>
              </Pressable>
            )}
          </View>
        )}
        ListEmptyComponent={
          !loading 
            ? <Text style={styles.empty} accessibilityLiveRegion={tokens.liveRegionPolite}>{cardListTexts.list.empty}</Text> 
            : null
        }
        ListFooterComponent={<ListFooter isLoadingMore={loadingMore} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};