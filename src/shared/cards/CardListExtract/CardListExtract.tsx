import { CardListExtractProps, EditedValuesMap } from "../../ProfileStyles/profile.styles.types";


import { useTransactions } from "@/src/contexts/TransactionsContext";
import { layout, spacing, typography } from "@/src/theme";
import { showToast } from "@/src/utils/transactions.utils";
import React, { useState } from "react";
import { FlatList, Linking, Pressable, Text, View } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { ListFooter } from "../../components/ListFooter/ListFooter";
import { ListHeader } from "../../components/ListHeader/ListHeader";
import { styles } from "./CardListExtract.styles";
import { cardListTexts } from "./cardListExtractTexts";

export const CardListExtract: React.FC<CardListExtractProps> = ({ filterFn, title }) => {
  const { transactions, loading, loadingMore, hasMore, loadMoreTransactions, updateTransaction, deleteTransactions } = useTransactions();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedValues, setEditedValues] = useState<EditedValuesMap>({});
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

 
  const filtered = transactions;
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
    setIsDeleting(false);
    setEditedValues({});
    setSelectedItems(new Set());
  };

const handleSaveClick = async () => {
    if (isDeleting) {
      await handleDeleteSelected();
      return;
    }

    const transacoesAlteradas = Object.entries(editedValues).filter(([id, rawTextCentavos]) => {
      const transacaoOriginal = transactions.find(t => t.id === id);
      const novoValorNumerico = parseFloat(rawTextCentavos) / 100;

      return !isNaN(novoValorNumerico) && transacaoOriginal && transacaoOriginal.valor !== novoValorNumerico;
    });


    if (transacoesAlteradas.length === 0) {
      setIsEditing(false);
      setEditedValues({});
      return;
    }

    const updatePromises = transacoesAlteradas.map(async ([id, rawTextCentavos]) => {
      const novoValorNumerico = parseFloat(rawTextCentavos) / 100;
      return updateTransaction(id, { valor: novoValorNumerico });
    });

    try {
      await Promise.all(updatePromises);
      showToast("success", cardListTexts.toasts.saveSuccess.title, cardListTexts.toasts.saveSuccess.message);
    } catch (error) {
      console.error("Ocorreu um erro ao atualizar as transações:", error);
      showToast("error", cardListTexts.toasts.saveError.title, cardListTexts.toasts.saveError.message);
    } finally {
      setIsEditing(false);
      setEditedValues({});
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const handleItemSelection = (itemId: string, isSelected: boolean) => {
    setSelectedItems(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (isSelected) {
        newSelected.add(itemId);
      } else {
        newSelected.delete(itemId);
      }
      return newSelected;
    });
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.size === 0) {
      showToast("error", "Atenção", "Selecione pelo menos um item para excluir.");
      return;
    }

    try {
      await deleteTransactions(Array.from(selectedItems));
      showToast("success", "Sucesso!", `${selectedItems.size} item(ns) excluído(s) com sucesso.`);
      setIsDeleting(false);
      setSelectedItems(new Set());
    } catch (error) {
      console.error("Erro ao excluir transações:", error);
      showToast("error", "Erro", "Não foi possível excluir os itens selecionados.");
    }
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
            isDeleting={isDeleting}
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
              ? cardListTexts.item.accessibility.cardLabel(item.tipo, item.valor,'1') 
              : cardListTexts.item.accessibility.editingCardLabel(item.tipo)
            }
          >
            <View style={styles.row}>
              {
              isDeleting ? 
                <View style={{ flexDirection: layout.flexRow, alignItems: typography.alignCenter, gap: spacing.xs }}>
                  <Checkbox
                    value={selectedItems.has(item.id!)}
                    onValueChange={(isSelected) => handleItemSelection(item.id!, isSelected)}
                    accessibilityLabel={`Selecionar ${item.tipo} para exclusão`}
                    accessibilityHint="Marque para incluir este item na exclusão"
                  />
                  <Text style={styles.description} accessibilityElementsHidden={true}>{item.tipo}</Text>
                </View>
              
              : <Text style={styles.description} accessibilityElementsHidden={true}>{item.tipo}</Text>
              }
              
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
            <Text style={styles.date} accessibilityElementsHidden={true}></Text>
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
            ? <Text style={styles.empty} accessibilityLiveRegion={typography.liveRegionPolite}>{cardListTexts.list.empty}</Text> 
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
