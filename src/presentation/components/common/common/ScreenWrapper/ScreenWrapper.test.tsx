import { render, screen } from "@testing-library/react-native";
import type React from "react";
import type { JSX } from "react";
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

jest.mock("../../../../../shared/cards/balance/BalanceComponent", () => {
  const mockReact = jest.requireActual<{ createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element }>("react");
  const reactNative = jest.requireActual<{ View: unknown; Text: unknown }>("react-native");
  const mockView = reactNative.View;
  const mockText = reactNative.Text;

  const BalanceMock = ({ user }: BalanceProps): JSX.Element =>
    mockReact.createElement(
      mockView,
      { testID: "balance" },
      mockReact.createElement(mockText, null, `Balance para ${user?.displayName ?? user?.name ?? ""}`)
    );

  BalanceMock.displayName = "BalanceComponentMock";

  return { __esModule: true, default: BalanceMock };
});

interface CardListExtractProps {
  title: string;
}

jest.mock("../../../../../shared/cards/CardListExtract/CardListExtract", () => {
  const mockReact = jest.requireActual<{ createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element }>("react");
  const reactNative = jest.requireActual<{ View: unknown; Text: unknown }>("react-native");
  const mockView = reactNative.View;
  const mockText = reactNative.Text;

  const CardListExtract = ({ title }: CardListExtractProps): JSX.Element =>
    mockReact.createElement(
      mockView,
      { testID: "extract" },
      mockReact.createElement(mockText, null, `Extrato: ${title}`)
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
