import { render, screen } from "@testing-library/react-native";
import type { FC } from "react";
import { ScreenWrapper } from "./ScreenWrapper";

jest.mock("@presentation/state/AuthContext", () => ({
  useAuth: (): { userData: { name: string; uuid: string } } => ({
    userData: { name: "Michele", uuid: "user-123" },
  }),
}));

jest.mock("@presentation/state/TransactionsContext", () => ({
  useTransactions: (): {
    transactions: unknown[];
    loading: boolean;
    addTransaction: jest.Mock;
    removeTransaction: jest.Mock;
  } => ({
    transactions: [],
    loading: false,
    addTransaction: jest.fn(),
    removeTransaction: jest.fn(),
  }),
}));

interface BalanceProps {
  user?: { displayName?: string; name?: string };
}

// ✅ Tipo auxiliar seguro para mocks de componentes
type MockedFC<P = Record<string, unknown>> = FC<P> & { displayName?: string };

// Mock do componente de Balance (default export)
jest.mock("../../../../../shared/cards/balance/BalanceComponent", () => {
  const React = require("react");
  const { View, Text } = require("react-native");

  const BalanceMock = ({ user }: BalanceProps) =>
    React.createElement(
      View,
      { testID: "balance" },
      React.createElement(Text, null, `Balance para ${user?.displayName ?? user?.name ?? ""}`)
    );

  BalanceMock.displayName = "BalanceComponentMock";

  return { __esModule: true, default: BalanceMock };
});

interface CardListExtractProps {
  title: string;
}

// Mock do CardListExtract (named export)
jest.mock("../../../../../shared/cards/CardListExtract/CardListExtract", () => {
  const React = require("react");
  const { View, Text } = require("react-native");

  const CardListExtract = ({ title }: CardListExtractProps) =>
    React.createElement(
      View,
      { testID: "extract" },
      React.createElement(Text, null, `Extrato: ${title}`)
    );

  CardListExtract.displayName = "CardListExtractMock";

  return { __esModule: true, CardListExtract };
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
