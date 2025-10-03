import { useTransactions } from "@/src/contexts/TransactionsContext";
import { colors, layout, spacing, texts, typography } from "@/src/theme";
import { showToast } from "@/src/utils/transactions.utils";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import React, { Fragment, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  Pressable,
  Text,
  View,
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { ListFooter } from "../../components/ListFooter/ListFooter";
import { ListHeader } from "../../components/ListHeader/ListHeader";
import {
  CardListExtractProps,
  EditedValuesMap,
} from "../../ProfileStyles/profile.styles.types";
import { styles } from "./CardListExtract.styles";


export const CardListExtract: React.FC<CardListExtractProps> = ({
  filterFn,
  title,
}) => {
  const {
    transactions,
    loading,
    loadingMore,
    hasMore,
    loadMoreTransactions,
    updateTransaction,
    uploadAttachmentAndUpdateTransaction,
    deleteAttachment,
    deleteTransactions,
  } = useTransactions();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedValues, setEditedValues] = useState<EditedValuesMap>({});
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const filtered = transactions;

  const handleOpenReceipt = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      showToast(
        "error",
        texts.cardList.toasts.openReceiptError.title,
        texts.cardList.toasts.openReceiptError.message
      );
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
        const valorEmCentavosString = valorComDecimais.replace(".", "");
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

    const transacoesAlteradas = Object.entries(editedValues).filter(
      ([id, rawTextCentavos]) => {
        const transacaoOriginal = transactions.find((t) => t.id === id);
        const novoValorNumerico = parseFloat(rawTextCentavos) / 100;
        return (
          !isNaN(novoValorNumerico) &&
          transacaoOriginal &&
          transacaoOriginal.valor !== novoValorNumerico
        );
      }
    );

    if (transacoesAlteradas.length === 0) {
      setIsEditing(false);
      setEditedValues({});
      return;
    }

    const updatePromises = transacoesAlteradas.map(
      async ([id, rawTextCentavos]) => {
        const novoValorNumerico = parseFloat(rawTextCentavos) / 100;
        return updateTransaction(id, { valor: novoValorNumerico });
      }
    );

    try {
      await Promise.all(updatePromises);
      showToast(
        "success",
        texts.cardList.toasts.saveSuccess.title,
        texts.cardList.toasts.saveSuccess.message
      );
    } catch (error) {
      showToast(
        "error",
        texts.cardList.toasts.saveError.title,
        texts.cardList.toasts.saveError.message
      );
    } finally {
      setIsEditing(false);
      setEditedValues({});
    }
  };

  const handleAttachFile = async (transactionId: string) => {
    setUploadingId(transactionId);
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        await uploadAttachmentAndUpdateTransaction(
          transactionId,
          file.uri,
          file.name
        );
        const toast = texts.cardList.toasts.attachSuccess;
        showToast("success", toast.title, toast.message);
      }
    } catch (error) {
      const toast = texts.cardList.toasts.attachError;
      showToast("error", toast.title, toast.message);
    } finally {
      setUploadingId(null);
    }
  };

  const handleDeleteAttachment = (transactionId: string, fileUrl: string) => {
    const dialog = texts.cardList.dialogs.deleteAttachment;
    Alert.alert(dialog.title, dialog.message, [
      { text: dialog.cancelButton, style: "cancel" },
      {
        text: dialog.confirmButton,
        onPress: async () => {
          try {
            await deleteAttachment(transactionId, fileUrl);
            const toast = texts.cardList.toasts.deleteAttachmentSuccess;
            showToast("success", toast.title, toast.message);
          } catch (error) {
            const toast = texts.cardList.toasts.deleteAttachmentError;
            showToast("error", toast.title, toast.message);
          }
        },
        style: "destructive",
      },
    ]);
  };

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const handleItemSelection = (itemId: string, isSelected: boolean) => {
    setSelectedItems((prevSelected) => {
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
      const toast = texts.cardList.toasts.deleteTransactionsWarning;
      showToast("error", toast.title, toast.message);
      return;
    }

    try {
      await deleteTransactions(Array.from(selectedItems));
      const toast = texts.cardList.toasts.deleteTransactionsSuccess;
      showToast("success", toast.title, toast.message(selectedItems.size));
      setIsDeleting(false);
      setSelectedItems(new Set());
    } catch (error) {
      const toast = texts.cardList.toasts.deleteTransactionsError;
      showToast("error", toast.title, toast.message);
    }
  };

  const handleValueChange = (id: string, newValue: string) => {
    setEditedValues((prevValues) => ({
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
                ? texts.cardList.item.accessibility.cardLabel(
                    item.tipo,
                    item.valor,
                    item.updateAt
                  )
                : texts.cardList.item.accessibility.editingCardLabel(item.tipo)
            }
          >
            <View style={styles.row}>
              {isDeleting ? (
                <View
                  style={{
                    flexDirection: layout.flexRow,
                    alignItems: typography.alignCenter,
                    gap: spacing.xs,
                  }}
                >
                  <Checkbox
                    value={selectedItems.has(item.id!)}
                    onValueChange={(isSelected) =>
                      handleItemSelection(item.id!, isSelected)
                    }
                    accessibilityLabel={`Selecionar ${item.tipo} para exclusão`}
                    accessibilityHint="Marque para incluir este item na exclusão"
                  />
                  <Text
                    style={styles.description}
                    accessibilityElementsHidden={true}
                  >
                    {item.tipo}
                  </Text>
                </View>
              ) : (
                <Text
                  style={styles.description}
                  accessibilityElementsHidden={true}
                >
                  {item.tipo}
                </Text>
              )}

              {isEditing ? (
                <MaskedTextInput
                  style={styles.input}
                  type="currency"
                  options={{
                    prefix: "R$ ",
                    decimalSeparator: ",",
                    groupSeparator: ".",
                    precision: 2,
                  }}
                  value={editedValues[item.id!]}
                  onChangeText={(_, rawText) =>
                    handleValueChange(item.id!, rawText)
                  }
                  keyboardType="decimal-pad"
                  accessibilityLabel={texts.cardList.item.accessibility.amountInputLabel(
                    item.tipo
                  )}
                  accessibilityValue={{
                    text: texts.cardList.item.accessibility.amountInputValue(
                      item.valor
                    ),
                  }}
                  accessibilityHint={
                    texts.cardList.item.accessibility.amountInputHint
                  }
                />
              ) : (
                <Text style={styles.amount} accessibilityElementsHidden={true}>
                  {item.valor >= 0
                    ? `+ R$ ${item.valor.toFixed(2).replace(".", ",")}`
                    : `- R$ ${Math.abs(item.valor)
                        .toFixed(2)
                        .replace(".", ",")}`}
                </Text>
              )}
            </View>

            <Text style={styles.date} accessibilityElementsHidden={true}>
              {texts.cardList.item.updatedAtLabel} {item.updateAt}
            </Text>

            {item.anexos && item.anexos.length > 0 && (
              <View style={styles.attachmentsContainer}>
                <Text style={styles.attachmentsTitle}>
                  {texts.cardList.item.attachmentsTitle}
                </Text>
                {item.anexos.map((url, index) => (
                  <Fragment key={index}>
                    <View style={styles.attachmentRow}>
                      <Pressable onPress={() => handleOpenReceipt(url)}>
                        <Text style={styles.attachmentLink}>
                          {texts.cardList.item.attachmentLink(index + 1)}
                        </Text>
                      </Pressable>

                      {isEditing && (
                        <Pressable
                          style={styles.deleteButton}
                          onPress={() => handleDeleteAttachment(item.id!, url)}
                        >
                          <Feather
                            name="trash-2"
                            size={spacing.md}
                            color={colors.byteColorRed500}
                          />
                        </Pressable>
                      )}
                    </View>

                    {index < item.anexos.length - 1 && (
                      <View style={styles.separator} />
                    )}
                  </Fragment>
                ))}
              </View>
            )}

            {isEditing && (
              <View style={styles.editActionsContainer}>
                {uploadingId === item.id ? (
                  <ActivityIndicator
                    size="small"
                    color={colors.byteColorBlue500}
                  />
                ) : (
                  <Pressable
                    onPress={() => handleAttachFile(item.id!)}
                    style={styles.receiptButton}
                    disabled={!!uploadingId}
                    accessibilityRole="button"
                    accessibilityLabel={texts.cardList.item.accessibility.attachButtonLabel(
                      item.tipo
                    )}
                  >
                    <Text style={styles.receiptButtonText}>
                      {texts.cardList.item.attachButton}
                    </Text>
                  </Pressable>
                )}
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={
          !loading ? (
            <Text
              style={styles.empty}
              accessibilityLiveRegion={typography.liveRegionPolite}
            >
              {texts.cardList.list.empty}
            </Text>
          ) : null
        }
        ListFooterComponent={<ListFooter isLoadingMore={loadingMore} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};
