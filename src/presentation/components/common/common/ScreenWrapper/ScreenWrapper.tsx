import { useAuth } from "@presentation/state/AuthContext";
import { useTransactions } from "@presentation/state/TransactionsContext";
import Balance from "@shared/cards/balance/BalanceComponent";
import { CardListExtract } from "@shared/cards/CardListExtract/CardListExtract";
import type { ITransaction, ScreenWrapperProps } from "@shared/interfaces/auth.interfaces";
import type { UserInfo } from "firebase/auth";
import type { JSX } from "react";
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
  const { balance } = useTransactions();

  const userInfo = {
    displayName: userData?.name,
  } as UserInfo;

  const balanceText = {
    account: "corrente",
    value: balance,
  };

  const defaultFilter = (transaction: ITransaction): boolean => {
    const isUserTransaction = transaction.userId === userData?.uuid;

    if (!extractFilter) {
      return isUserTransaction;
    }

    return isUserTransaction && extractFilter(transaction);
  };

  const renderHeader = (): JSX.Element => (
    <View style={styles.header}>
      {showBalance && <Balance balance={balanceText} user={userInfo} />}
      {children}
    </View>
  );

  const renderFooter = (): JSX.Element | null => {
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
        renderItem={(): null => null}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
