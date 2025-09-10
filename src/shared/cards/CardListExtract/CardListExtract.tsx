import { ITransaction, useTransactions } from "@/src/contexts/TransactionsContext";
import React from "react";
import { FlatList, Linking, Pressable, Text, View } from "react-native";
import { styles } from "./CardListExtract.styles";

type CardListExtractProps = {
  filterFn?: (transaction: ITransaction) => boolean;
  title?: string;
};

export const CardListExtract: React.FC<CardListExtractProps> = ({ filterFn, title }) => {
  const { transactions, loading, loadingMore, hasMore, loadMoreTransactions } = useTransactions();

  const filtered = filterFn ? transactions.filter(filterFn) : transactions;


  const handleOpenReceipt = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn("Não foi possível abrir o recibo:", url);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loadingMore) {
      loadMoreTransactions();
    }
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.loadingFooter}>
        <Text style={styles.loadingText}>Carregando mais transações...</Text>
      </View>
    );
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
              <Text style={styles.description}>{item.tipo}</Text>
              <Text style={styles.amount}>
                {item.valor >= 0 ? `+ R$ ${item.valor.toFixed(2)}` : `- R$ ${Math.abs(item.valor).toFixed(2)}`}
              </Text>
            </View>
            <Text style={styles.date}>
              {item.createdAt}
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
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};
