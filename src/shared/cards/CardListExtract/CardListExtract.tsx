/* eslint-disable @typescript-eslint/no-misused-promises */
import type { AttachmentFile } from "@/domain/entities/TransactionData";
import type { ITransaction as LegacyITransaction } from "@/domain/interfaces/auth.interfaces";
import { Feather } from "@expo/vector-icons";
import { useTransactions } from "@presentation/state/TransactionsContext";
import { colors, spacing, texts, typography } from "@presentation/theme";
import { truncateString } from "@shared/utils/string";
import { showToast } from "@shared/utils/transactions.utils";
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
import type {
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
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedValues, setEditedValues] = useState<EditedValuesMap>({});
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  // O tipo de `transactions` vem do domínio (ITransaction do domain) e pode
  // divergir da forma antiga esperada por `filterFn` (typing legacy). Fazemos
  // um cast controlado para manter compatibilidade até migrarmos todas as
  // dependências para o novo shape.
  const filtered = filterFn
    ? ((transactions as unknown as LegacyITransaction[]).filter(filterFn) as unknown as typeof transactions)
    : transactions;

  // -------------------- Funções auxiliares --------------------

  const handleOpenReceipt = async (url: string): Promise<void> => {
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

  const handleEditClick = (): void => {
    const initialValues = filtered.reduce((acc, transaction) => {
      if (transaction.id) {
        const valorComDecimais = transaction.valor.toFixed(2);
        acc[transaction.id] = valorComDecimais.replace(".", "");
      }
      return acc;
    }, {} as EditedValuesMap);

    setEditedValues(initialValues);
    setIsEditing(true);
  };

  const handleCancelClick = (): void => {
    setIsEditing(false);
    setIsDeleting(false);
    setEditedValues({});
    setSelectedItems(new Set());
  };

  const handleValueChange = (id: string, newValue: string): void => {
    setEditedValues((prevValues) => ({ ...prevValues, [id]: newValue }));
  };

  const handleAttachFile = async (transactionId: string): Promise<void> => {
    setUploadingId(transactionId);
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (!result.canceled && result.assets?.length) {
        const file = result.assets[0];
        // Converte URI para Blob e anexa o nome para que o repositório consiga usar
        const response = await fetch(file.uri);
        const blob = await response.blob();
        // o repositório espera um AttachmentFile (File). Em runtime, um blob com a propriedade 'name' é aceitável.
        const attachment = Object.assign(blob, { name: file.name }) as unknown as AttachmentFile;

        await updateTransaction(transactionId, {}, [attachment], []);
        showToast(
          "success",
          texts.cardList.toasts.attachSuccess.title,
          texts.cardList.toasts.attachSuccess.message
        );
      }
    } catch (e) {
      console.error("Erro ao anexar:", e);
      showToast(
        "error",
        texts.cardList.toasts.attachError.title,
        texts.cardList.toasts.attachError.message
      );
    } finally {
      setUploadingId(null);
    }
  };

  const handleDeleteAttachment = (
    transactionId: string,
    fileUrl: string
  ): void => {
    const dialog = texts.cardList.dialogs.deleteAttachment;
    Alert.alert(dialog.title, dialog.message, [
      { text: dialog.cancelButton, style: "cancel" },
      {
        text: dialog.confirmButton,
        style: "destructive",
        onPress: () => {
          // ✅ Corrigido: executa async com void
          void (async () => {
            try {
              // Usa o novo contrato: updateTransaction com attachmentsToRemove
              await updateTransaction(transactionId, {}, [], [fileUrl]);
              showToast(
                "success",
                texts.cardList.toasts.deleteAttachmentSuccess.title,
                texts.cardList.toasts.deleteAttachmentSuccess.message
              );
            } catch (e) {
              console.error("Erro ao deletar anexo:", e);
              showToast(
                "error",
                texts.cardList.toasts.deleteAttachmentError.title,
                texts.cardList.toasts.deleteAttachmentError.message
              );
            }
          })();
        },
      },
    ]);
  };

  const handleItemSelection = (itemId: string, isSelected: boolean): void => {
    setSelectedItems((prev) => {
      const updated = new Set(prev);
      if (isSelected) updated.add(itemId);
      else updated.delete(itemId);
      return updated;
    });
  };

  const handleDeleteSelected = async (): Promise<void> => {
    if (selectedItems.size === 0) {
      showToast(
        "error",
        texts.cardList.toasts.deleteTransactionsWarning.title,
        texts.cardList.toasts.deleteTransactionsWarning.message
      );
      return;
    }

    try {
      // Para cada transação selecionada, chama deleteTransaction passando os anexos atuais (se houver)
      await Promise.all(
          Array.from(selectedItems).map(async (id) => {
          const tx = transactions.find((t) => t.id === id);
          const attachments = tx?.attachments ?? [];
          await deleteTransaction(id, attachments);
        })
      );
      showToast(
        "success",
        texts.cardList.toasts.deleteTransactionsSuccess.title,
        texts.cardList.toasts.deleteTransactionsSuccess.message(
          selectedItems.size
        )
      );
      setSelectedItems(new Set());
      setIsDeleting(false);
    } catch (e) {
      console.error("Erro ao deletar transações:", e);
      showToast(
        "error",
        texts.cardList.toasts.deleteTransactionsError.title,
        texts.cardList.toasts.deleteTransactionsError.message
      );
    }
  };

  const handleSaveClick = async (): Promise<void> => {
    if (isDeleting) {
      await handleDeleteSelected();
      return;
    }

    const transacoesAlteradas = Object.entries(editedValues).filter(
      ([id, rawTextCentavos]) => {
        const transacao = transactions.find((t) => t.id === id);
        const novoValor = parseFloat(rawTextCentavos) / 100;
        return transacao && transacao.valor !== novoValor;
      }
    );

    if (!transacoesAlteradas.length) {
      setIsEditing(false);
      setEditedValues({});
      return;
    }

    try {
      await Promise.all(
        transacoesAlteradas.map(([id, raw]) =>
          // novo contrato: updateTransaction(id, updatedTransaction, newAttachments, attachmentsToRemove)
          updateTransaction(id, { valor: parseFloat(raw) / 100 }, [], [])
        )
      );
      showToast(
        "success",
        texts.cardList.toasts.saveSuccess.title,
        texts.cardList.toasts.saveSuccess.message
      );
    } catch (e) {
      console.error("Erro ao salvar alterações:", e);
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

  // -------------------- Render --------------------

  return (
    <View style={styles.container}>
      <FlatList
        data={filtered}
  keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <ListHeader
            title={title}
            isEditing={isEditing}
            isDeleting={isDeleting}
            onSave={handleSaveClick}
            onCancel={handleCancelClick}
            onEdit={handleEditClick}
            onDelete={() => setIsDeleting(true)}
          />
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.description}>{item.tipo}</Text>

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
                value={editedValues[item.id] ?? ""}
                onChangeText={(_, raw) => handleValueChange(item.id, raw)}
              />
            ) : (
              <Text>R$ {item.valor.toFixed(2).replace(".", ",")}</Text>
            )}

            {item.attachments?.map((url: string, i: number) => (
              <Fragment key={i}>
                <Pressable
                  onPress={() => {
                    void handleOpenReceipt(url);
                  }}
                >
                  <Text style={styles.attachmentLink}>
                    {truncateString(decodeURIComponent(url.split("/").pop() ?? url), 20)}
                  </Text>
                </Pressable>

                {isEditing && (
                  <Pressable
                    onPress={() => {
                      handleDeleteAttachment(item.id, url);
                    }}
                  >
                    <Feather
                      name="trash-2"
                      size={spacing.md}
                      color={colors.byteColorRed500}
                    />
                  </Pressable>
                )}
              </Fragment>
            ))}

            {isEditing && (
              <View style={styles.editActionsContainer}>
                {uploadingId === item.id ? (
                  <ActivityIndicator color={colors.byteColorBlue500} />
                ) : (
                  <Pressable
                    onPress={() => {
                      void handleAttachFile(item.id);
                    }}
                    disabled={!!uploadingId}
                  >
                    <Text>{texts.cardList.item.attachButton}</Text>
                  </Pressable>
                )}
              </View>
            )}

            {isDeleting && (
              <Checkbox
                value={selectedItems.has(item.id)}
                onValueChange={(v) => handleItemSelection(item.id, v)}
              />
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
        ListFooterComponent={<ListFooter isLoadingMore={false} />}
        onEndReachedThreshold={0.1}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};
