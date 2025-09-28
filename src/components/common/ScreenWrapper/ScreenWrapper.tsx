// src/components/layouts/ScreenWrapper.tsx
import { useAuth } from "@/src/contexts/AuthContext";
import Balance from "@/src/shared/cards/balance/BalanceComponent";
import { CardListExtract } from "@/src/shared/cards/CardListExtract/CardListExtract";
import { ITransaction, ScreenWrapperProps } from "@/src/shared/interfaces/auth.interfaces";
import { UserInfo } from "firebase/auth";
import React from "react";
import { FlatList, View } from "react-native";
import { styles } from "./ScreenWrapper.styles";

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  showBalance = true,
  showExtract = true,
  extractTitle = "Extrato",
  extractFilter,
}) => {
  const { userData } = useAuth();

  const userInfo = {
    displayName: userData?.name,
  } as UserInfo;

  const balance = {
    account: "corrente",
    value: 209021,
  };

  const defaultFilter = (transaction: ITransaction) => {
    const isUserTransaction = transaction.userId === userData?.uuid;

    if (!extractFilter) {
      return isUserTransaction;
    }

    return isUserTransaction && extractFilter(transaction);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      {showBalance && <Balance balance={balance} user={userInfo} />}
      {children}
    </View>
  );

  const renderFooter = () => {
    if (!showExtract) return null;

    return (
      <View style={styles.footer}>
        <CardListExtract title={extractTitle} filterFn={defaultFilter} />
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
