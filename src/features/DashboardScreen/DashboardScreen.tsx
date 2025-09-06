import { NewTransactionForm } from "@/src/components/forms/NewTransactionForm/NewTransactionForm";
import Balance from "@/src/shared/cards/balance/BalanceComponent";
import { CardListExtract } from "@/src/shared/cards/CardListExtract/CardListExtract";
import { UserInfo } from "firebase/auth";
import React from "react";
import { FlatList, View } from "react-native";
import { styles } from "./DashboardScreen.styles";

const DashboardScreen: React.FC = () => {
  const user = {
    displayName: "Joana"
  } as UserInfo

  const balance = { account: 'corrente', value: 209021 }

  const renderHeader = () => (
    <View>
      <Balance balance={balance} user={user} />
      <NewTransactionForm />
    </View>
  );

  const renderFooter = () => (
    <CardListExtract title="Extrato" />
  );

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

export default DashboardScreen;
