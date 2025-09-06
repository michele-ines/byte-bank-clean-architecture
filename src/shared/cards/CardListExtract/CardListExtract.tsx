import { Transaction, useTransactions } from "@/src/hooks/useTransactions";
import React from "react";
import { FlatList, Linking, Pressable, Text, View } from "react-native";
import { styles } from "./CardListExtract.styles";

type CardListExtractProps = {
  filterFn?: (transaction: Transaction) => boolean;
  title?: string;
};

export const CardListExtract: React.FC<CardListExtractProps> = ({ filterFn, title }) => {
  const { transactions, loading } = useTransactions();

  const filtered = filterFn ? transactions.filter(filterFn) : transactions;

  const handleOpenReceipt = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn("Não foi possível abrir o recibo:", url);
    }
  };

  return (
    <View style={styles.container}>
      {title ? <Text style={styles.title}>{title}</Text> : null}

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.amount}>
                {item.amount >= 0 ? `+ R$ ${item.amount.toFixed(2)}` : `- R$ ${Math.abs(item.amount).toFixed(2)}`}
              </Text>
            </View>
            <Text style={styles.date}>
              {new Date(item.date).toLocaleDateString("pt-BR")}
            </Text>

            {item.receiptUrl && (
              <Pressable
                onPress={() => handleOpenReceipt(item.receiptUrl!)}
                style={styles.receiptButton}
              >
                <Text style={styles.receiptButtonText}>Ver Recibo</Text>
              </Pressable>
            )}
          </View>
        )}
        ListEmptyComponent={
          !loading ? <Text style={styles.empty}>Nenhuma transação encontrada.</Text> : null
        }
      />
    </View>
  );
};
