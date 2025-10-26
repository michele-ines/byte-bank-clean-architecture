import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Text, View } from "react-native";
import { ScreenWrapper } from "./ScreenWrapper";

jest.mock("@/src/contexts/AuthContext", () => ({
  useAuth: () => ({
    userData: { name: "Michele", uuid: "user-123" },
  }),
}));

jest.mock("@/src/contexts/TransactionsContext", () => ({
  useTransactions: () => ({
    transactions: [],
    loading: false,
    addTransaction: jest.fn(),
    removeTransaction: jest.fn(),
  }),
}));

jest.mock("@/src/shared/cards/balance/BalanceComponent", () => {
  const BalanceMock = ({ user }: any) => (
    <View testID="balance">
      <Text>{`Balance para ${user?.displayName || user?.name}`}</Text>
    </View>
  );
  (BalanceMock as any).displayName = "BalanceComponentMock";
  return BalanceMock;
});

jest.mock("@/src/shared/cards/CardListExtract/CardListExtract", () => {
  const CardListExtract = ({ title }: { title: string }) => (
    <View testID="extract">
      <Text>{`Extrato: ${title}`}</Text>
    </View>
  );
  (CardListExtract as any).displayName = "CardListExtractMock";
  return { CardListExtract };
});

describe("ScreenWrapper", () => {
  it("deve renderizar Balance e CardListExtract quando ambos estiverem habilitados", () => {
    render(
      <ScreenWrapper>
        <></>
      </ScreenWrapper>
    );

    expect(screen.getByTestId("balance")).toHaveTextContent("Balance para Michele");
    expect(screen.getByTestId("extract")).toHaveTextContent("Extrato: Extrato");
  });

  it("não deve renderizar Balance quando showBalance=false", () => {
    render(
      <ScreenWrapper showBalance={false}>
        <></>
      </ScreenWrapper>
    );

    expect(screen.queryByTestId("balance")).toBeNull();
  });

  it("não deve renderizar CardListExtract quando showExtract=false", () => {
    render(
      <ScreenWrapper showExtract={false}>
        <></>
      </ScreenWrapper>
    );

    expect(screen.queryByTestId("extract")).toBeNull();
  });

  it("deve aplicar filtro padrão e renderizar título customizado do extrato", () => {
    render(
      <ScreenWrapper extractTitle="Meus lançamentos">
        <></>
      </ScreenWrapper>
    );

    expect(screen.getByTestId("extract")).toHaveTextContent("Extrato: Meus lançamentos");
  });
});
